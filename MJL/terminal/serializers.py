from rest_framework import serializers
from terminal.models import Terminal
from django.utils import timezone, dateformat

class TerminalSerializers(serializers.ModelSerializer):

    class Meta:
        model = Terminal
        fields = ('nama',)

    def create(self, validated_data):
        terminal = Terminal.objects.create(nama=validated_data['nama'])
        return terminal

class AllTerminalSerializers(serializers.ModelSerializer):

    class Meta:
        model = Terminal
        fields = '__all__'
