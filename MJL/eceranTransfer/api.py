from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import EceranTransferSerializers
from .models import EceranTransfer
from products.models import Product
from terminal.models import Terminal
from users.models import User
from rest_framework import mixins
from rest_framework.exceptions import ValidationError
import datetime

class CreateEceranTransfer(generics.GenericAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = EceranTransferSerializers

    def post(self, request, *args, **kwargs):
        terminal = Terminal.objects.get(nama=request.data["terminal"])
        tanggal = datetime.datetime.now().strftime("%Y-%m-%d")
        jam = datetime.datetime.now().strftime("%H:%M:%S")
        user = User.objects.get(id=request.data["id"])
        
        if (terminal.tipe == "KASIR"):
            try:
                timestamp = datetime.datetime.now().strftime("%Y-%m-%d, %H:%M:%S")
                data = {"bank" : request.data["bank"],
                        "total" : request.data["total"],
                        "tanggal_transfer" : request.data["tanggal_transfer"],
                        "user" : user.username,
                        "catatan" : request.data["catatan"],
                        "terminal" : request.data["terminal"],
                        "tanggal" : tanggal,
                        "jam" : jam
                        }
                
                serializer = self.get_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                eceranTransfer = serializer.save()
                terminal.saldo_akhir -= request.data["total"]
                terminal.total_transfer += request.data["total"]
                terminal.save()

                return Response({
                    "message" : "Eceran Transfer Added to the system"
                })
            except:
                return ValidationError({
                    "failed" : "fail to create Pengeluaran"
                })
        else:
            return ValidationError({ 
                "terminal_unavailable" : "Device Not Available"
            })

class GetEceranTransferByDate(generics.ListAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = EceranTransferSerializers

    def get_queryset(self):
        start_date = self.request.GET["start_date"]
        end_date = self.request.GET["end_date"]
        terminal = self.request.GET["terminal"]
        id = self.request.GET["id"]
        
        return EceranTransfer.objects.filter(tanggal__range=[start_date, end_date], 
                terminal=terminal).order_by('jam')


