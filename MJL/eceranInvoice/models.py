from django.db import models
from users.models import User
from products.models import Product
from terminal.models import Terminal
from eceranDailyReport.models import EceranDailyReport

REGULAR = "REGULAR"
VOID = "VOID"

TYPE = (
    (REGULAR, "REGULAR"),
    (VOID, "VOID"),
)

#Create your models here.
class EceranInvoice(models.Model):
    nomor = models.CharField(max_length=12, unique=True, primary_key=True) 
    tanggal = models.DateField(default=None)
    jam = models.TimeField(default=None)
    barang = models.JSONField(default=None)
    total = models.PositiveIntegerField(default=None)
    terminal = models.ForeignKey(Terminal, on_delete=models.CASCADE, to_field="nama")
    reset_id = models.CharField(max_length=50, blank=True, null=True, default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field="username")
    nama = models.CharField(max_length=50, null=True, blank=True) 
    tipe = models.CharField(max_length=7,
                                 choices=TYPE,
                                 default="REGULAR")
    catatan = models.CharField(max_length=200, blank=True, null=True)