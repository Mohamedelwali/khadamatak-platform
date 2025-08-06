from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    user_type = serializers.ChoiceField(choices=CustomUser.USER_TYPE_CHOICES, required=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    phone_verified = serializers.BooleanField(required=False, default=False)
    email_verified = serializers.BooleanField(required=False, default=False)
    location = serializers.JSONField(required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'user_type', 'phone', 'phone_verified', 'email_verified', 'location')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
