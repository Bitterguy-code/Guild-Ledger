# Generated by Django 5.2 on 2025-04-20 23:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('character_app', '0006_remove_character_money_alter_character_user'),
        ('item_app', '0002_item_prices_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='character',
            field=models.ManyToManyField(null=True, related_name='items', to='character_app.character'),
        ),
    ]
