from rest_framework import serializers
from .models import Outbound

class OutboundSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Outbound
        fields = ['id', 'product', 'product_name', 'quantity', 'recipient', 'date_shipped', 'remarks']
