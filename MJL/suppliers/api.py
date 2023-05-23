from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import SupplierSerializers
from .models import Supplier
from rest_framework import mixins
from rest_framework.exceptions import ValidationError

class AddNewSupplier(generics.GenericAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = SupplierSerializers

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        customer = serializer.save()
        return Response({
            "message": "Supplier Successfully Added to the system"
        })

class GetAllSuppliersName(generics.ListAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = SupplierSerializers
    def get_queryset(self):
        return Supplier.objects.all().order_by('nama_supplier')