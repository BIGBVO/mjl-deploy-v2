from django.db import models

# Create your models here.
class Terminal(models.Model):

    ADMIN = "ADMIN"
    KASIR = "KASIR"

    TYPE = (
        (ADMIN, "ADMIN"),
        (KASIR, "KASIR"),
    )

    nama = models.CharField(max_length=10, unique=True, primary_key=True)
    tipe = models.CharField(max_length=5, choices=TYPE, default="ADMIN")
    saldo_awal = models.PositiveIntegerField(default=0)
    saldo_akhir = models.PositiveIntegerField(default=0)
    total_penjualan = models.PositiveIntegerField(default=0)
    total_void = models.PositiveIntegerField(default=0)
    total_transfer = models.PositiveIntegerField(default=0)
    total_pengeluaran = models.PositiveIntegerField(default=0)
