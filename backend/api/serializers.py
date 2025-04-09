from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'userEmail', 'userPassword', 'gender','mood']

        def create(self, validated_data):
             validated_data['userPassword'] = validated_data['userPassword'] 
             return super().create(validated_data)
         
class userMoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userEmail', 'mood']

class MoodLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodLog
        fields = ['id', 'mood', 'timestamp', 'energy_change', 'notes']

class UserEnergySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEnergy
        fields = ['current_level', 'last_updated']        