from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.TextField()
    rarity = models.TextField()
    vendor_value = models.IntegerField()
    game_id = models.IntegerField()
    icon = models.URLField()
    today_buy = models.IntegerField(null=True)
    minus_one_buy = models.IntegerField(null=True)
    minus_three_buy = models.IntegerField(null=True)
    today_sell = models.IntegerField(null=True)
    minus_one_sell = models.IntegerField(null=True)
    minus_three_sell = models.IntegerField(null=True)
    prices_updated = models.DateField(null=True)