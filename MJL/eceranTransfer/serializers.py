from rest_framework import serializers
from .models import EceranTransfer
from django.utils import timezone, dateformat

class EceranTransferSerializers(serializers.ModelSerializer):
    class Meta:
        model = EceranTransfer
        fields = ('bank', 'tanggal_transfer', 'tanggal', 'jam', 'user', 'catatan', 'total', 'terminal')

    def create(self, validated_data):
        invoice = EceranTransfer.objects.create(bank=validated_data['bank'],
                                                tanggal_transfer=validated_data['tanggal_transfer'],
                                                user = validated_data['user'],
                                                catatan=validated_data['catatan'],
                                                terminal=validated_data['terminal'],
                                                tanggal=validated_data['tanggal'],
                                                jam = validated_data['jam'],
                                                total = validated_data['total'],
                                                )
        return invoice
