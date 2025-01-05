from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now

from .models import Flashcard, Deck
# users.models
from .serializers import (FlashcardCreateSerializer, FlashcardModifySerializer, FlashcardDeleteSerializer,
                          DeckCreateSerializer, DeckModifySerializer, DeckDeleteSerializer,
                        DeckSerializer, FlashcardSerializer)

import json
from openai import OpenAI
from decouple import config

from rest_framework.permissions import AllowAny


# Create Deck
# Delete Deck
# Shuffle Deck - frontend
# Add to Deck
# Remove from Deck

class deckAccess():
    def load_deck(self, id):
        """
        Retrieve specific deck
        """
        deck = Deck.objects.get(id=id, is_deleted=False)
        print("Deck found")
        print(deck)
        return deck

    def list_decks(self):
        """
        List all Undeleted Decks
        """
        decks =  Deck.objects.filter(is_deleted=False)
        return decks

    def edit_deck(self, id, name, description):
        """
        Make change to specific undeleted deck. 
        """
        deck_item = Deck.objects.get(id=id, is_deleted=False)

        deck_item.name = name
        deck_item.description = description

        deck_item.save()

    def delete_deck(self, id):
        deck_item = Deck.objects.get(id=id, is_deleted=False)
        deck_item.tempdelete()
        deck_item.save()


    def list_flashcards(self, id):
        cards = Flashcard.objects.filter(deck=id)
        print(cards)
        return cards

    def count_flashcards(self):
        return self.list_flashcards.count()


class get_decks(APIView, deckAccess):
    """
    Get all decks
    """
    permission_classes = [AllowAny]

    def __init__(self):
        self.Serializer = DeckSerializer
    def get(self, request):

        decks =  self.list_decks()

        if decks == None:
             return Response(
                {"error": "No decks found"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.Serializer(decks, many=True)

        return Response(serializer.data,
                        status=status.HTTP_200_OK
                        )


class add_deck(APIView):
    """
    Perform operations on decks: create
    """
    def __init__(self):
        self.Serializer = DeckCreateSerializer
    permission_classes = [AllowAny]    
    def post(self, request):        

        try:
            serializer = self.Serializer(data=request.data)
            if serializer.is_valid():
                print(serializer.validated_data)
                serializer.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            print(f"An exception occured {str(e)}")
            return Response(
                {"error": "An error occured"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class edit_deck(APIView):
    """
    Edit a deck
    """
    def __init__(self):
        self.Serializer = DeckModifySerializer

    permission_classes = [AllowAny]   
    def post(self, request):
        # Edit a flashcard
        serializer = self.Serializer(data=request.data)
        print(request.data)
        
        if serializer.is_valid() == False:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        print(serializer.data)

        term = serializer.data["name"]
        description = serializer.data["description"]
        id = serializer.data["id"]

        try:
            deck = self.edit_Deck(id, term, description)
        except Deck.DoesNotExist:
            return Response(
                {"error": "Card not found or has been deleted."},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(deck.name, status=status.HTTP_200_OK)
        

class delete_deck(APIView, deckAccess):
    """
    Delete Deck
    """
    permission_classes = [AllowAny]

    def __init__(self):
        self.Serializer = DeckDeleteSerializer

    def post(self, request):
        serializer = self.Serializer(data=request.data)
        print(request.data)
        
        if serializer.is_valid() == False:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        print(serializer.data)

        id = serializer.data["id"]
        try:
            # Check that the deck exists
            #deck = Deck.objects.get(id=id, is_deleted=False)
            self.delete_deck(serializer.data['id'])

            return Response(
                {"error": "Card has been deleted."},
                status=status.HTTP_200_OK
            )
        except Deck.DoesNotExist:
            return Response(
                {"error": "Card not found or has been deleted."},
                status=status.HTTP_404_NOT_FOUND
            )


class get_deck(APIView, deckAccess):
    """
    Get specific deck and its contents
    """
    permission_classes = [AllowAny]

    def __init__(self):
        self.DeckSerializer = DeckSerializer
        self.FlashcardSerializer = FlashcardSerializer
    def get(self, request, id):
        try:
            # Check that the deck exists
            deck_item = self.load_deck(id)
            print(f"Deck found {deck_item}")
        except Deck.DoesNotExist:
            return Response(
                {"error": "Deck not found or has been deleted."},
                status=status.HTTP_404_NOT_FOUND
            )

        try:     
            # cards = Flashcard.objects.filter(deck=id)
            # print(cards)

            cards = self.list_flashcards(id)
            Deckserializer = self.DeckSerializer(deck_item, many=False)
            FlashcardSerializer = self.FlashcardSerializer(cards, many=True)
            print("serialized")
            combined_data = {
                        "deck":Deckserializer.data,
                        "size":cards.count(),
                        "flashcards": "No flashcards found" if cards.count() == 0 else FlashcardSerializer.data 
                    }
            return Response(combined_data,
                            status=status.HTTP_200_OK)
        
        except Exception as e:
            print(f"An exception occured {str(e)}")
            return Response(
                {"error": "An error occured"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class study_deck(APIView):
    def post(self, request, id):
        try:
            deck = Deck.objects.get(id=id)
            deck.last_studied = now()  # Update last_studied timestamp
            print("Study updated")
            deck.save()
            serializer = DeckSerializer(deck)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Deck.DoesNotExist:
            return Response({"error": "Deck not found"}, status=status.HTTP_404_NOT_FOUND)




class get_flashcard(APIView):
    """
    Get all flashcards
    """
    permission_classes = [AllowAny]

    def __init__(self):
        self.Serializer = FlashcardCreateSerializer
    def get(self, request):

        flashcards =  Flashcard.objects.all()
        serializer = self.Serializer(flashcards, many=True)
        return Response(serializer.data)

    
class create_flashcard(APIView):
    """
    Perform operations on flashcard: create
    """
    def __init__(self):
        self.Serializer = FlashcardCreateSerializer
    permission_classes = [AllowAny]    
    def post(self, request,deck_id):

        try:
            # Check that the deck exists
            deck = Deck.objects.get(id=deck_id, is_deleted=False)
        except Deck.DoesNotExist:
            return Response(
                {"error": "Deck not found or has been deleted."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        data = request.data.copy()
        data['deck_id'] = deck.id
        print(data)
        serializer = self.Serializer(data=data)
        

        if serializer.is_valid():
            print(serializer.validated_data)
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class edit_flashcard(APIView):
    """
    Edit a flashcard
    """
    def __init__(self):
        self.Serializer = FlashcardModifySerializer

    permission_classes = [AllowAny]   
    def post(self, request):
        # Edit a flashcard
        serializer = self.Serializer(data=request.data)
        print(request.data)
        
        if serializer.is_valid() == False:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        print(serializer.data)

        term = serializer.data["term"]
        definition = serializer.data["definition"]
        id = serializer.data["id"]

        flashcard = Flashcard.objects.get(id=id, is_deleted=False)

        flashcard.term = term
        flashcard.definition = definition

        flashcard.save()

        return Response(flashcard.term, status=status.HTTP_200_OK)
        

class delete_flashcard(APIView):
    """
    Delete Flashcard
    """
    permission_classes = [AllowAny]

    def __init__(self):
        self.Serializer = FlashcardDeleteSerializer

    def post(self, request):
        serializer = self.Serializer(data=request.data)
        print(request.data)
        
        if serializer.is_valid() == False:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        print(serializer.data)

        id = serializer.data["id"]
        try:
            # Check that the deck exists
            card = Flashcard.objects.get(id=id, is_deleted=False)
        except Flashcard.DoesNotExist:
            return Response(
                {"error": "Card not found or has been deleted."},
                status=status.HTTP_404_NOT_FOUND
            )

        card.tempdelete()
        card.save()

        return Response(serializer.data, status=status.HTTP_200_OK)



class generate_deck(APIView):
    """
    Generate a deck and its associated flashcards from the AI response.
    """
    permission_classes = [AllowAny]
    
    def __init__(self):
        self.deck_serializer = DeckCreateSerializer
        self.flashcard_serializer = FlashcardCreateSerializer
    
    def post(self, request):
        """
        Create a deck and auto-generate flashcards using AI.
        """
        try:
            name = request.data.get('name',"Default")
            description = request.data.get('description', 'No Description')
            prompt = request.data.get('prompt', 'How to Study')
            
            deck_data = {
                "name" : name,
                "description" : description
            }
            print(deck_data)




            deck_serializer = self.deck_serializer(data=deck_data)

            print("serializing")
            if not deck_serializer.is_valid():
                return Response(
                    {"error": "Deck creation failed", "details": deck_serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
            deck = deck_serializer.save()
            print("saved")

            response = query_openrouter(prompt, max_retries=5)
            
            flashcards_data = response

            print(flashcards_data)

            # Use flashcard data to create new flashcards for specified deck
            flashcard_responses = []
            for flashcard_data in flashcards_data:
                flashcard_data['deck'] = deck.id
                flashcard_serializer = self.flashcard_serializer(data=flashcard_data)

                if flashcard_serializer.is_valid():
                    flashcard = flashcard_serializer.save()
                    flashcard_responses.append(flashcard_serializer.data)

                    print("Flashcard Saved")
                else:
                    return Response(
                        {"error": "Flashcard creation failed", "details": flashcard_serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            return Response(
                {
                    "deck": deck_serializer.data,
                    "flashcards": flashcard_responses,
                },
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            print(e)
            deck.delete()
            return Response(
                {"error": "An error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



def query_openrouter(prompt, max_retries=5):
    """
    Querrying OpenRouter with Prompt from user
    """

    client = OpenAI(
                    base_url="https://openrouter.ai/api/v1",
                    api_key= config('API_KEY'),
                )


    content =  f"""Generate 10 flashcards on the topic '{prompt}' in valid JSON format with term, and definition fields.
            Do not include any comments, explanations, or extraneous characters in the response."""
    


    for attempt in range(max_retries):
        try:
            completion = client.chat.completions.create(

                model="openai/gpt-3.5-turbo-1106",
                messages=[
                    {
                    "role": "user",
                    "content": content
                    }
                ]
            )

            # Parse the JSON response

            try:
                parsed = json.loads(completion.choices[0].message.content)
                return parsed
            except json.JSONDecodeError:
                print("The response is not valid JSON.")
                return None
            
        except Exception as e:
            print(f"Error: {e}")
            return None