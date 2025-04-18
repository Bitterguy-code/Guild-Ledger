from django.urls import path
from .views import CharacterView

urlpatters = [
    path('', CharacterView.as_view(), name='info'),
    path('update/<int:character_id>/', CharacterView.as_view(), name='update'),
    path('delete/<int:character_id>/', CharacterView.as_view(), name='delete')
]