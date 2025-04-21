from django.db import models
from character_app.models import Character

# Create your models here.
class Item(models.Model):
    name = models.TextField()
    rarity = models.TextField()
    vendor_value = models.IntegerField()
    game_id = models.IntegerField()
    icon = models.URLField()
    character = models.ManyToManyField(Character, related_name='items', null=True)
    yesterday_buy = models.IntegerField(null=True)
    yesteryesterday_buy = models.IntegerField(null=True)
    yesteryesteryesterday_buy = models.IntegerField(null=True)
    yesterday_sell = models.IntegerField(null=True)
    yesteryesterday_sell = models.IntegerField(null=True)
    yesteryesteryesterday_sell = models.IntegerField(null=True)
