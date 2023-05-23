from django.db import models
from suppliers.models import Supplier

class ProductCategory(models.Model):
    nama = models.CharField(max_length=20, unique=True, primary_key=True)

class Product(models.Model):

    kode = models.CharField(max_length=50, unique=True, primary_key=True)
    nama = models.CharField(max_length=50)
    kategori = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, to_field="nama")
    quantity = models.PositiveIntegerField(default=0)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, to_field="nama_supplier")
    modal = models.PositiveIntegerField(default=0)
    pengangkutan = models.PositiveIntegerField(default=0)
    harga_S = models.PositiveIntegerField(default=0)
    harga_A = models.PositiveIntegerField(default=0)
    harga_B = models.PositiveIntegerField(default=0)
    stok = models.IntegerField(default=0)
    po = models.PositiveIntegerField(default=0)
    otw = models.PositiveIntegerField(default=0)
    gambar = models.ImageField(upload_to="product_pictures", null=True, blank=True)

