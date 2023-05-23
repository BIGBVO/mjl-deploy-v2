from rest_framework import serializers
from pengeluaran.models import Pengeluaran
from django.utils import timezone, dateformat

class PengeluaranSerializers(serializers.ModelSerializer):
    class Meta:
        model = Pengeluaran
        fields = ('tipe', 'tanggal', 'jam', 'user', 'catatan', 'total', 'terminal')

    def create(self, validated_data):
        pengeluaran = Pengeluaran.objects.create(tipe=validated_data['tipe'],
                                                jam=validated_data['jam'],
                                                tanggal = validated_data['tanggal'],
                                                user = validated_data['user'],
                                                catatan=validated_data['catatan'],
                                                terminal=validated_data['terminal'],
                                                total = validated_data['total'],
                                                )
        return pengeluaran
