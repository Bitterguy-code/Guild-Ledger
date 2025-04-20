from django.db import models
from user_app.models import User

#Create your models here.
class Character(models.Model):
    
    name = models.TextField(unique=True)
    money = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='characters')
    
    class Meta:
        unique_together = ['name', 'user']