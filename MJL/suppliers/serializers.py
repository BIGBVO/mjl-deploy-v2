from rest_framework import serializers
from products.models import Supplier
from django.utils import timezone, dateformat

class SupplierSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Supplier
        fields = ('nama_supplier',)

    def create(self, validated_data):
        """Return complete product instance based on the validated data."""
        supplier = Supplier.objects.create(nama_supplier=validated_data['nama_supplier'],)
        return supplier
