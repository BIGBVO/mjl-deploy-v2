from django.db import models
from users.models import User
from terminal.models import Terminal
import json

class EceranDailyReport(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field="username")
    terminal = models.ForeignKey(Terminal, on_delete=models.CASCADE, to_field="nama")
    jam = models.TimeField()
    tanggal = models.DateField()
    saldo_awal = models.PositiveIntegerField()
    total_regular = models.PositiveIntegerField()
    total_void = models.PositiveIntegerField()
    total_pengeluaran = models.PositiveIntegerField()
    total_transfer = models.PositiveIntegerField()
    penarikan = models.PositiveIntegerField()
    saldo_akhir = models.PositiveIntegerField()

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)