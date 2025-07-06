from django.urls import path
from .views import OutboundListCreateView

urlpatterns = [
    path('', OutboundListCreateView.as_view(), name='outbound-list-create'),
]
