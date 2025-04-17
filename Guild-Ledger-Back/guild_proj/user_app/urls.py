from django.urls import path
from .views import Sign_up, Log_in, Log_out, Info, Set_API_Key


urlpatterns = [
    path('', Info.as_view(), name='info'),
    path('login/', Log_in.as_view(), name='login'),
    path('signup/', Sign_up.as_view(), name='signup'),
    path('logout/', Log_out.as_view(), name='logout' ),
    path('key/', Set_API_Key.as_view(), name='key')
]