from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
from time import gmtime, strftime





class ProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Profile
        fields ='__all__'
    
    def create(self, validated_data):
        profile = super(ProfileSerializer, self).create(validated_data)
        profile.set_password(validated_data['password'])
  
        profile.save()
        return profile


class UserSerializerWithToken(ProfileSerializer, serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    points = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Profile
        fields = ['_id',  'email', 'image','name','token','points']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    def get_points(self, obj):
        default = 0
        points = Point.objects.filter(user=obj)
        if len(points)>0:
            default= len(points)
        return default
 