from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Flashcard
# users.models
from .serializers import FlashcardCreateSerializer, FlashcardModifySerializer, FlashcardDeleteSerializer
from django.views import View


from rest_framework.permissions import AllowAny


# Create Deck
# Delete Deck
# Shuffle Deck
# Add to Deck
# Remove from Deck



class get_flashcard(APIView):
    permission_classes = [AllowAny]

    def __init__(self):
        self.Serializer = FlashcardCreateSerializer
    def get(self, request):

        flashcards =  Flashcard.objects.all()
        serializer = self.Serializer(flashcards, many=True)
        return Response(serializer.data)
    
        #return HttpResponse("Here's a flashcard")

    
class create_flashcard(APIView):
    """
    Perform operations on flashcard: create
    """
    def __init__(self):
        self.serializer = FlashcardCreateSerializer
    permission_classes = [AllowAny]    
    def post(self, request):
        serializer = self.Serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class edit_flashcard(APIView):
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

        flashcard = Flashcard.objects.get(id=id)

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

        flashcard = Flashcard.objects.get(id=id)
        flashcard.delete()

        return Response(serializer.data, status=status.HTTP_200_OK)


# Edit Flash Card
# Shuffle card(randomize selection)
#Create Deck