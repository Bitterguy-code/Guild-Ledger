# Generated by Django 5.2 on 2025-04-20 23:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0002_user_apikey'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='money',
            field=models.IntegerField(null=True),
        ),
    ]
