from django.urls import path
from . import views

urlpatterns = [
    path('api/flashcards/', views.get_flashcard.as_view(), name='get_flashcard'),
    path('api/add_flashcard/', views.set_flashcard.as_view(), name='add_flashcard')
]