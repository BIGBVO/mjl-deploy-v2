from rest_framework import serializers
from eceranDailyReport.models import EceranDailyReport
from django.utils import timezone, dateformat

class EceranDailyReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = EceranDailyReport
        fields = '__all__'

    def create(self, validated_data):
        report = EceranDailyReport.objects.create(id=validated_data['id'],
                                                  user=validated_data['user'],
                                                  terminal=validated_data['terminal'],
                                                  jam=validated_data['jam'],
                                                  tanggal=validated_data['tanggal'],
                                                  saldo_awal=validated_data['saldo_awal'],
                                                  total_regular=validated_data['total_regular'],
                                                  total_void=validated_data['total_void'],
                                                  total_pengeluaran=validated_data['total_pengeluaran'],
                                                  total_transfer=validated_data['total_transfer'],
                                                  penarikan=validated_data['penarikan'],
                                                  saldo_akhir=validated_data['saldo_akhir'],
                                                )
        return report