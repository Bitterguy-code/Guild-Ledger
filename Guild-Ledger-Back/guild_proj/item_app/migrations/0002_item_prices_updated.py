# Generated by Django 5.2 on 2025-04-18 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='prices_updated',
            field=models.DateField(null=True),
        ),
    ]
