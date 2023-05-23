from django.db import models

# Create your models here.
from django.utils import timezone, dateformat

# Create your models here.
class Supplier(models.Model):

    nama_supplier = models.CharField(max_length=50, unique=True, primary_key=True)
    total_utang = models.PositiveIntegerField(default=0)
    saldo = models.PositiveIntegerField(default=0)
    pembayaran_terakhir = models.CharField(max_length = 200, null=True, blank=True)
