from django.db import models
from inventory.models import Product

class Inbound(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="inbound_entries")
    quantity = models.PositiveIntegerField()
    received_from = models.CharField(max_length=255)
    received_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.name} from {self.received_from}"

class InboundRecord(models.Model):
    product_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    supplier = models.CharField(max_length=255, blank=True)
    date_received = models.DateField()
    remarks = models.TextField(blank=True)

    def __str__(self):
        return f"Inbound - {self.product_name} ({self.quantity})"
