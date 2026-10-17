from rest_framework import serializers

class AccountSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    organization = serializers.IntegerField()
    name = serializers.CharField()
    balance = serializers.FloatField()
    account_type = serializers.CharField()
    is_active = serializers.BooleanField()
    created_at = serializers.DateTimeField()
