from django.urls import path
from .views import InboundListCreateView, InboundBulkUpload

urlpatterns = [
    path('', InboundListCreateView.as_view(), name='inbound-list-create'),
    path('upload/', InboundBulkUpload.as_view(), name='inbound-upload'),
]
