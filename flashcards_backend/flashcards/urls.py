from django.urls import path
from . import views

urlpatterns = [
    path('api/flashcards/', views.get_flashcard.as_view(), name='get_flashcard'),
    path('api/add-flashcard/', views.create_flashcard.as_view(), name='add_flashcard'),
    path('api/delete-flashcard/', views.delete_flashcard.as_view(), name='delete_flashcard'),
    path('api/edit-flashcard/', views.edit_flashcard.as_view(), name='edit_flashcard'),

    path('api/generate-deck/', views.generate_deck.as_view(), name='generate_deck'),

    path('api/add-deck/', views.add_deck.as_view(), name='add_deck'),
    path('api/get-decks/', views.get_decks.as_view(), name='get_decks'),
    path('api/get-deck/<uuid:id>/', views.get_deck.as_view(), name='get_deck'),
    path('api/study-deck/<uuid:id>/', views.study_deck.as_view(), name='get_deck'),
    path('api/edit-deck/<uuid:id>/', views.edit_deck.as_view(), name='edit_deck'),
    path('api/delete-deck/', views.delete_deck.as_view(), name='delete_deck'),
]