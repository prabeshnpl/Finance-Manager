from rest_framework import serializers

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(allow_null=True, required=False)
    organization_id = serializers.IntegerField(allow_null=True, required=False)
    name = serializers.CharField(allow_null=True, required=False)
    category_type = serializers.CharField(allow_null=True, required=False)
    color = serializers.CharField(allow_null=True, required=False)
    created_at = serializers.DateTimeField(allow_null=True, required=False)

class CategoryBreakdownSerializer(CategorySerializer):
    total = serializers.FloatField(required=False)