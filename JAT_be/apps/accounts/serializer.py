from rest_framework import serializers
from .models import CustomUserManager , User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =User
        fields = [ "first_name", "last_name", "username" , "email" , "is_varified" , 'password']
        extra_kwargs = {'password' : {'write_only':True} , 'is_varified' : {'read_only':True} }
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user