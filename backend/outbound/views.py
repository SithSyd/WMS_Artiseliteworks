from rest_framework import generics
from .models import Outbound
from .serializers import OutboundSerializer

class OutboundListCreateView(generics.ListCreateAPIView):
    queryset = Outbound.objects.all().order_by('-date_shipped')
    serializer_class = OutboundSerializer
