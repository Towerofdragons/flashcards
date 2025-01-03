from rest_framework import serializers
from .models import Flashcard, Deck


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


class DeckSerializer(serializers.ModelSerializer):
    # deck_id = serializers.UUIDField(source='id', required=True)
    class Meta:
        model = Deck
        fields = "__all__"

class DeckCreateSerializer(serializers.ModelSerializer):
    #deck_id = serializers.UUIDField(source='id', required=True)
    class Meta:
        model = Deck
        fields = ["name", "description"]
class DeckDeleteSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=True)
    class Meta:
        model = Deck
        fields = ['id']

class DeckModifySerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=True)
    class Meta:
        model = Deck
        fields = ['id', 'name','definition']

class FlashcardSerializer(serializers.ModelSerializer):
    card_id = serializers.UUIDField(source='id', required=True)
    class Meta:
        model = Flashcard
        fields = "__all__"

class FlashcardCreateSerializer(serializers.ModelSerializer):
    #deck = serializers.UUIDField(source='id', required=True)
    class Meta:
        model = Flashcard
        fields = ["deck", 'term','definition']