from django.db import models
import uuid
# Create your models here.

class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    def tempdelete(self):
        self.is_deleted = True

    class Meta:
            abstract = True
   

class Deck(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True,related_name='decks')
    created_at = models.DateTimeField(auto_now_add=True)
    last_studied = models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return self.name
    
class Flashcard(BaseModel):
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE, related_name='flashcards')  # Many-to-one relationship
    term = models.CharField(max_length=255)
    definition = models.TextField()

    def __str__(self):
        return self.term

class Progress(BaseModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='progress')
    deck = models.ForeignKey('Deck', on_delete=models.CASCADE, related_name='progress')
    score = models.FloatField()
    attempted_on = models.DateTimeField(auto_now_add=True)


# class AIRequest(models.Model):
#     user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='ai_requests')
#     request_type = models.CharField(max_length=50, choices=[('summarize', 'Summarize'), ('generate_flashcards', 'Generate Flashcards')])
#     input_data = models.TextField()
#     output_data = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

# TODO

