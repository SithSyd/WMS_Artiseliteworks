from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework import generics, status
from .models import Product
from .serializers import ProductSerializer
import pandas as pd


# List all products or create a new one
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# Retrieve, update or delete a single product
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# Upload CSV or XLSX files to bulk add products
class ProductBulkUpload(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get("file")
        if not file:
            return Response({"error": "No file provided"}, status=400)

        try:
            # Read file into DataFrame
            if file.name.endswith('.csv'):
                df = pd.read_csv(file)
            elif file.name.endswith(('.xls', '.xlsx')):
                df = pd.read_excel(file)
            else:
                return Response({"error": "Unsupported file type"}, status=400)

            # Loop through rows and create Product objects
            for _, row in df.iterrows():
                Product.objects.create(
                    name=row.get("name", ""),
                    sku=row.get("sku", ""),
                    tags=row.get("tags", ""),
                    description=row.get("description", ""),
                    category=row.get("category", ""),
                    quantity=row.get("quantity", 0),
                    low_stock_threshold=row.get("low_stock_threshold", 0),
                )

            return Response({"success": True}, status=201)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
