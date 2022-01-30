from django.urls import path
from . import views

urlpatterns = [
    path('users/register/', views.ProfilecreateAPIView.as_view()),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('prizes/',views.getPrizes,name='getPrizes'),
    path('addpoints/<str:pk>/',views.addPoint,name='addpoints'),  
]