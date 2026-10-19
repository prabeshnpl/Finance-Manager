from rest_framework import serializers

class AccountSerializer(serializers.Serializer):
    id = serializers.IntegerField(allow_null=True, required=False)
    organization_id = serializers.IntegerField(allow_null=True, required=False)
    name = serializers.CharField(allow_null=True, required=False)
    balance = serializers.FloatField(allow_null=True, required=False)
    account_type = serializers.CharField(allow_null=True, required=False)
    is_active = serializers.BooleanField(allow_null=True, required=False)
    created_at = serializers.DateTimeField(allow_null=True, required=False)
