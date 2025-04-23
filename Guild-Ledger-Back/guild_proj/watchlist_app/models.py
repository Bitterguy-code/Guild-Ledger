from django.db import models
from character_app.models import Character
from item_app.models import Item

# Create your models here.
class Watchlist(models.Model):
    character = models.OneToOneField(Character, on_delete=models.CASCADE, related_name='watchlist')
    
class Watchlist_item(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, db_index=True)
    watchlist = models.ForeignKey(Watchlist, on_delete=models.DO_NOTHING, related_name='watchlist_items', db_index=True)
    sell_point = models.IntegerField(null=True)
    buy_point = models.IntegerField(null=True)