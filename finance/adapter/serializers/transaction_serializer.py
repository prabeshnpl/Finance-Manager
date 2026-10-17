from rest_framework import serializers

# class TransactionSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = Transaction
#         fields = "__all__"
    
#     def to_representation(self, instance):
#         rep = super().to_representation(instance)
#         rep['category'] = {
#             'id':instance.category.id,
#             'name':instance.category.name
#         } if instance.category else {}
#         rep['account'] = {
#             'id':instance.account.id,
#             'name':instance.account.name
#         } if instance.account else {}
#         rep['to_account'] = {
#             'id':instance.to_account.id,
#             'name':instance.to_account.name
#         } if instance.to_account else {}
        
#         return rep

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

class AccountCategorySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()

class TransactionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    amount = serializers.FloatField()
    transaction_type = serializers.CharField()
    created_by = UserSerializer(allow_null=True)
    initiated_by = UserSerializer(allow_null=True)
    account = AccountCategorySerializer()
    to_account = AccountCategorySerializer(allow_null=True)
    category = AccountCategorySerializer(allow_null=True)
    remaining_balance = serializers.FloatField(required=False, allow_null=True)
    occurred_at = serializers.DateTimeField()
    description = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField(read_only=True)
