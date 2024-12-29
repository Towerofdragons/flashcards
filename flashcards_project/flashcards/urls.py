from django.urls import path
from . import views

urlpatterns = [
    path('api/flashcards/', views.get_flashcard.as_view(), name='get_flashcard'),
    path('api/add_flashcard/', views.create_flashcard.as_view(), name='add_flashcard'),
    path('api/delete_flashcard/', views.delete_flashcard.as_view(), name='delete_flashcard'),
    path('api/edit_flashcard/', views.edit_flashcard.as_view(), name='edit_flashcard')

]