from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.signing import Signer

# Create your models here.
class User(AbstractUser):
    username = models.TextField(unique=True)
    email = models.EmailField(unique=True)
    APIKey = models.TextField(null=True, unique=True)
    money = models.IntegerField(null=True)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    
    def set_key(self, api_key):
        #sets the GW2 API key in an encrypted state
        signer = Signer()
        self.APIKey = signer.sign(api_key)
        
    def get_key(self):
        signer = Signer()
        return signer.unsign(self.APIKey)