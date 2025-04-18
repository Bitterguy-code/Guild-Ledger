from django.core.management.base import BaseCommand
import requests
from item_app.models import Item
import json

class Command(BaseCommand):
    help = 'Populates item data from the GW2 API'
       
    def handle(self, *args, **kwargs):
        page = 0
        items_created = 0

        while True:
            response = requests.get(f'https://api.guildwars2.com/v2/items?page={page}&page_size=200')
            
            if response.status_code != 200:
                break
            
            page += 1
            data = response.json()
            for item in data:
                try:
                    icon = item['icon']
                except KeyError:
                    icon = 'Guild-Ledger-Back/guild_proj/item_app/Unkown_icon.png'
                # self.stdout.write(f'{json.dumps(item)}')
                Item.objects.get_or_create(name=item['name'],
                                    rarity=item['rarity'],
                                    vendor_value=item['vendor_value'],
                                    game_id=item['id'],
                                    icon=icon)
                items_created+=1 
                # self.stdout.write(f'Finsished item {items_created}')
            self.stdout.write(f'Finsished page {page}')
        self.stdout.write(self.style.SUCCESS(f'Wrote {items_created} items.'))