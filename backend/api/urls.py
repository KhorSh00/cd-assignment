from django.urls import path
from .views import *

urlpatterns = [
path('signup/',signup,name='signup'),
path('login/', login, name='login'),
path("update-mood/", update_mood, name="update-mood"),
path("get-mood/",get_mood, name="get-mood"),
path("user/email/<str:email>/",get_user_info, name="get_user_info"),
path("log-mood/", log_mood, name="log-mood"),
path("mood-logs/", get_mood_logs, name="get-mood-logs"),
path("user-energy/", get_user_energy, name="get-user-energy"),
path('get_mood_summary/', get_mood_summary, name='get-mood-summary'),
]
