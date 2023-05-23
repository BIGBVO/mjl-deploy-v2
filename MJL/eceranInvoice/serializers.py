from rest_framework import serializers
from eceranInvoice.models import EceranInvoice
from django.utils import timezone, dateformat

class EceranInvoiceSerializers(serializers.ModelSerializer):
    class Meta:
        model = EceranInvoice
        fields = ('nomor', 'tanggal', 'jam', 'barang', 'total', 'user', 'nama', 'terminal', 'tipe', 'catatan')

    def create(self, validated_data):
        invoice = EceranInvoice.objects.create(nomor=validated_data['nomor'],
                                    tanggal=validated_data['tanggal'],
                                    jam = validated_data['jam'],
                                    barang=validated_data['barang'],
                                    total=validated_data['total'],
                                    user=validated_data['user'],
                                    nama=validated_data['nama'],
                                    terminal=validated_data['terminal'],
                                    tipe=validated_data['tipe'],
                                    catatan=validated_data['catatan'],
                                    )
        return invoice
