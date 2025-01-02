from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Flashcard, Deck
# users.models
from .serializers import (FlashcardCreateSerializer, FlashcardModifySerializer, FlashcardDeleteSerializer,
                          DeckCreateSerializer, DeckModifySerializer, DeckDeleteSerializer,
                        DeckSerializer, FlashcardSerializer)
from django.views import View


from rest_framework.permissions import AllowAny


# Create Deck
# Delete Deck
# Shuffle Deck - frontend
# Add to Deck
# Remove from Deck

class get_decks(APIView):
    """
    Get all decks
    """
    permission_classes = [AllowAny]

    def __init__(self):
        self.Serializer = DeckSerializer
    def get(self, request):

        decks =  Deck.objects.all()

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
            data = request.data.copy()
            #data["user_id"] =  # User data
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

        deck = Deck.objects.get(id=id, is_deleted=False)

        deck.name = term
        deck.description = description

        deck.save()

        return Response(deck.name, status=status.HTTP_200_OK)
        

class delete_deck(APIView):
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
            deck = Deck.objects.get(id=id, is_deleted=False)
        except Deck.DoesNotExist:
            return Response(
                {"error": "Card not found or has been deleted."},
                status=status.HTTP_404_NOT_FOUND
            )

        deck.delete()
        deck.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class get_deck(APIView):
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
            deck = Deck.objects.get(id=id, is_deleted=False)
            print("Deck found")
        except Deck.DoesNotExist:
            return Response(
                {"error": "Deck not found or has been deleted."},
                status=status.HTTP_404_NOT_FOUND
            )

        try:     
            cards = Flashcard.objects.filter(deck=id)
            print(cards)
            Deckserializer = self.DeckSerializer(deck, many=False)
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

        card.delete()
        card.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


# Edit Flash Card
# Shuffle card(randomize selection)
#Create Deck