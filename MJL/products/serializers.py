from rest_framework import serializers
from products.models import Product, ProductCategory
from django.utils import timezone, dateformat

class AddProductSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ('kode', 'nama', 'kategori', 'quantity', 'supplier', 
                  'modal', 'pengangkutan', 'harga_S', 'harga_A', 'harga_B','gambar')

    def create(self, validated_data):
        """Return complete product instance based on the validated data."""
        product = Product.objects.create(kode=validated_data['kode'],
                                         nama=validated_data['nama'],
                                         kategori=validated_data['kategori'],
                                         quantity=validated_data['quantity'],
                                         supplier=validated_data['supplier'],
                                         modal=validated_data['modal'],
                                         pengangkutan=validated_data['pengangkutan'],
                                         harga_S=validated_data['harga_S'],
                                         harga_A=validated_data['harga_A'],
                                         harga_B=validated_data['harga_B'],
                                         gambar=validated_data['gambar']
                                         )
        return product

class UpdateProductSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ('gambar', )

    def update(self, instance, validated_data):
        instance.gambar = validated_data['gambar']
        instance.save()
        return instance

class ProductCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'

    def create(self, validated_data):
        product_category = ProductCategory.objects.create(nama=validated_data['nama'])
        return product_category

class ProductSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ('kode', 'nama', 'kategori', 'quantity', 'harga_B', 'stok', 'po', 'otw')

class ProductCodeSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ('kode',)

class SpecificProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    
