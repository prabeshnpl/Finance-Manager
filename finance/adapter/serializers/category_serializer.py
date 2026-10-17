from rest_framework import serializers

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    organization = serializers.IntegerField()
    name = serializers.CharField()
    category_type = serializers.CharField()
    color = serializers.CharField(allow_null=True, required=False)
    created_at = serializers.DateTimeField()

class CategoryBreakdownSerializer(CategorySerializer):
    total = serializers.FloatField(required=False)