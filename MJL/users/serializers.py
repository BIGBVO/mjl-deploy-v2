from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    """Declare User Serializer."""

    class Meta:
        model = User
        fields = ('username', 'nama', 'penjualan_bulan_ini', 'penjualan_quartar_ini', 'groups')

class LoginSerializer(serializers.Serializer):

    class Meta:
        model = User
        fields = ('username', 'password')

class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'nama', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """Return complete user instance based on the validated data."""
        user = User.objects.create_user(username=validated_data['username'],
                                        nama=validated_data['nama'],
                                        password=validated_data['password'],)
        return user


