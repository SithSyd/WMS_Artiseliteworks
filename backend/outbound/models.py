from django.db import models
from inventory.models import Product

class Outbound(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="outbound_entries")
    quantity = models.PositiveIntegerField()
    recipient = models.CharField(max_length=255)
    date_shipped = models.DateField()
    remarks = models.TextField(blank=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.name} to {self.recipient}"
