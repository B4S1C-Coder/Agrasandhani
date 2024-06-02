from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]

class UserProfileSerializer(serializers.ModelSerializer):
    userid = serializers.ReadOnlyField(source="user.id")
    user = serializers.ReadOnlyField(source="user.username")
    email = serializers.ReadOnlyField(source="user.email")

    class Meta:
        model = UserProfile
        fields = "__all__"