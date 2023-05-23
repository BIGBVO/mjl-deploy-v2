from django.db import models
from suppliers.models import Supplier
from users.models import User
from terminal.models import Terminal
from eceranDailyReport.models import EceranDailyReport

class EceranTransfer(models.Model):

    bank = models.CharField(max_length=50)
    tanggal_transfer = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field="username")
    catatan = models.CharField(max_length=200)
    terminal = models.ForeignKey(Terminal, on_delete=models.CASCADE, to_field="nama")
    tanggal = models.DateField()
    jam = models.TimeField()
    total = models.PositiveIntegerField()
    reset_id = models.ForeignKey(EceranDailyReport, on_delete=models.CASCADE, to_field="id", null=True, blank=True)
    