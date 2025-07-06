from rest_framework import serializers
from .models import Inbound

class InboundSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Inbound
        fields = ['id', 'product', 'product_name', 'quantity', 'received_from', 'received_at']
