from django.db import models
from character_app.models import Character
from item_app.models import Item

# Create your models here.
class Watchlist(models.Model):
    Character = models.OneToOneField(Character, on_delete=models.CASCADE)
    
class Watchlist_item(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    watchlist = models.ForeignKey(Watchlist, on_delete=models.DO_NOTHING, related_name='wishlist_items')
    sell_point = models.IntegerField()
    buy_point = models.IntegerField()