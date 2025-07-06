from rest_framework import generics
from .models import Inbound
from .serializers import InboundSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
import pandas as pd

class InboundListCreateView(generics.ListCreateAPIView):
    queryset = Inbound.objects.all().order_by('-received_at')
    serializer_class = InboundSerializer

class InboundBulkUpload(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided'}, status=400)

        try:
            if file.name.endswith('.csv'):
                df = pd.read_csv(file)
            elif file.name.endswith(('.xls', '.xlsx')):
                df = pd.read_excel(file)
            else:
                return Response({'error': 'Unsupported file type'}, status=400)

            for _, row in df.iterrows():
                Inbound.objects.create(
                    product_id=row.get("product_id"),
                    quantity=row.get("quantity", 0),
                    received_from=row.get("received_from", "")
                )

            return Response({"success": True}, status=201)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
