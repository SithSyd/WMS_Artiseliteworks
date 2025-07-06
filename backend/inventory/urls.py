from django.urls import path
from .views import ProductListCreateView, ProductDetailView, ProductBulkUpload

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='product-list'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('upload/', ProductBulkUpload.as_view(), name='product-upload'),
]
