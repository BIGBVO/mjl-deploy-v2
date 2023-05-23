from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.core.validators import MinValueValidator

class User(AbstractUser, PermissionsMixin):
    nama = models.CharField(max_length=30, unique=True)
    penjualan_bulan_ini = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    penjualan_quartar_ini = models.IntegerField(default=0, validators=[MinValueValidator(0)])