from rest_framework import serializers
from .models import Flashcard

class FlashcardCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['term','definition']

class FlashcardDeleteSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=True)
    class Meta:
        model = Flashcard
        fields = ['id']

class FlashcardModifySerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=True)
    class Meta:
        model = Flashcard
        fields = ['id', 'term','definition']
