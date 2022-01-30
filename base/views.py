from rest_framework.response import Response
from .models import Profile
from rest_framework.decorators import api_view,permission_classes
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework import  viewsets
from rest_framework import generics
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .prizes import *



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data= super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    
    serializer_class = MyTokenObtainPairSerializer
    

class ProfilecreateAPIView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (AllowAny,)

@api_view(['GET'])
def getPrizes(request):
    return Response(prizes)

@api_view(['POST'])
def addPoint(request, pk):
    
    try:
        user = Profile.objects.get(_id=pk)
        point = Point.objects.create(user=user)
        point.save()
        return Response("Points added succesfully")

    except:
        return Response({'detail': 'An error occured! try again!'}, status=status.HTTP_400_BAD_REQUEST)
