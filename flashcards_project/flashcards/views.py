from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Flashcard
# users.models
from .serializers import FlashcardSerializer
from django.views import View


from rest_framework.permissions import AllowAny

class get_flashcard(APIView):
    permission_classes = [AllowAny]
    def get(self, request):

        flashcards =  Flashcard.objects.all()
        serializer = FlashcardSerializer(flashcards, many=True)
        return Response(serializer.data)
    
        #return HttpResponse("Here's a flashcard"


        return HttpResponse("You've put up a flashcard")
    
class set_flashcard(APIView):
    permission_classes = [AllowAny]    
    def post(self, request):
        serializer = FlashcardSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)