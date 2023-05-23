from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import PengeluaranSerializers
from .models import Pengeluaran
from terminal.models import Terminal
from users.models import User
from rest_framework import mixins
from rest_framework.exceptions import ValidationError
import datetime

class CreatePengeluaran(generics.GenericAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = PengeluaranSerializers

    def post(self, request, *args, **kwargs):
        terminal = Terminal.objects.get(nama=request.data["terminal"])
        tanggal = datetime.datetime.now().strftime("%Y-%m-%d")
        jam = datetime.datetime.now().strftime("%H:%M:%S")
        user = User.objects.get(id=request.data["id"])
        
        if (terminal.tipe == "KASIR"):
            try:
                timestamp = datetime.datetime.now().strftime("%Y-%m-%d, %H:%M:%S")
                data = {"tipe" : request.data["tipe"],
                        "total" : request.data["total"],
                        "user" : user.username,
                        "catatan" : request.data["catatan"],
                        "terminal" : request.data["terminal"],
                        "tanggal" : tanggal,
                        "jam" : jam
                        }

                serializer = self.get_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                pengeluaran = serializer.save()
 
                terminal.saldo_akhir -= request.data["total"]
                terminal.total_pengeluaran += request.data["total"]
                terminal.save()


                return Response({
                    "message" : "Pengeluaran Added to the system"
                })
            except:
                return ValidationError({
                    "failed" : "fail to create Pengeluaran"
                })
        else:
            return ValidationError({ 
                "terminal_unavailable" : "Device Not Available"
            })

class GetPengeluaranByDate(generics.ListAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = PengeluaranSerializers

    def get_queryset(self):
        start_date = self.request.GET["start_date"]
        end_date = self.request.GET["end_date"]
        terminal = self.request.GET["terminal"]
        id = self.request.GET["id"]
        
        return Pengeluaran.objects.filter(tanggal__range=[start_date, end_date], 
                terminal=terminal).order_by('jam')

