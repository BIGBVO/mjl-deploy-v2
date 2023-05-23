# Generated by Django 4.1.3 on 2023-01-21 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('nama_supplier', models.CharField(max_length=50, primary_key=True, serialize=False, unique=True)),
                ('total_utang', models.PositiveIntegerField(default=0)),
                ('saldo', models.PositiveIntegerField(default=0)),
                ('pembayaran_terakhir', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
    ]