from rest_framework import serializers
from finance.models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Transaction
        fields = "__all__"

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(allow_null=True, required=False)
    first_name = serializers.CharField(allow_null=True, required=False)
    last_name = serializers.CharField(allow_null=True, required=False)

class AccountCategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(allow_null=True, required=False)
    name = serializers.CharField(allow_null=True, required=False)

class TransactionDTOSerializer(serializers.Serializer):
    id = serializers.IntegerField(allow_null=True, required=False)
    amount = serializers.FloatField(allow_null=True, required=False)
    transaction_type = serializers.CharField(allow_null=True, required=False)
    created_by = UserSerializer(allow_null=True)
    initiated_by = UserSerializer(allow_null=True)
    account = AccountCategorySerializer(allow_null=True, required=False)
    to_account = AccountCategorySerializer(allow_null=True)
    category = AccountCategorySerializer(allow_null=True)
    remaining_balance = serializers.FloatField(required=False, allow_null=True)
    occurred_at = serializers.DateTimeField(allow_null=True, required=False)
    description = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField(read_only=True)

