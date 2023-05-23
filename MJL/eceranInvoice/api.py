from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import EceranInvoiceSerializers
from .models import EceranInvoice
from products.models import Product
from terminal.models import Terminal
from users.models import User
from rest_framework import mixins
from rest_framework.exceptions import ValidationError
import datetime


class CreateInvoice(generics.GenericAPIView):

    serializer_class = EceranInvoiceSerializers


    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, *args, **kwargs):
        
        terminal = Terminal.objects.get(nama=request.data["terminal"])
        user = User.objects.get(id=request.data["id"])

        if (terminal.tipe == "KASIR"):
            try:
                tanggal = datetime.datetime.now().strftime("%Y-%m-%d")
                jam = datetime.datetime.now().strftime("%H:%M:%S")
                year = datetime.datetime.now().strftime("%Y")[2:]
                month = datetime.datetime.now().strftime("%m")
                day = datetime.datetime.now().strftime("%d")
                date = month + day
                pre = ""
                catatan = request.data["catatan"]

                if (request.data["tipe"] == "VOID"):
                    pre = "VE"
                    prefix = "VE-" + date + "-"
                    previous_invoice = EceranInvoice.objects.filter(tipe="VOID", nomor__contains=prefix).order_by('-nomor').first()
                  
                else:
                    pre = "RE"
                    prefix = "RE-" + date + "-"
                    previous_invoice = EceranInvoice.objects.filter(tipe="REGULAR", nomor__contains=prefix).order_by('-nomor').first()

                if previous_invoice is not None:
                    num = int(previous_invoice.nomor[8:])+1
                else:
                    num = 1

                invoice_id = '{pre}-{date}-{num:04d}'.format(pre=pre, date=date, num=num)
                data = {"nomor" : invoice_id,
                        "tanggal" : tanggal,
                        "jam" : jam,
                        "barang" : request.data["barang"],
                        "total" : request.data["total"],
                        "user" : user.username,
                        "nama" : user.nama,
                        "terminal" : request.data["terminal"],
                        "tipe" : request.data["tipe"],
                        "catatan" : catatan
                        }

                serializer = self.get_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                invoice = serializer.save()

                barang = request.data["barang"]

                for brg in barang:
                    product = Product.objects.get(kode=brg["kode"])
                    #invoice.brg.add(product)
                    product.stok = product.stok - int(brg["quantity"])
                    product.save()

                invoice = EceranInvoice.objects.filter(nomor=invoice_id)
                invoice = list(invoice.values())

                if (request.data["tipe"] == "VOID"):
                    terminal.saldo_akhir -= int(request.data["total"])
                    terminal.total_void += int(request.data["total"])
                else:
                    terminal.saldo_akhir += int(request.data["total"])
                    terminal.total_penjualan += int(request.data["total"])

                terminal.save()

                return Response({
                    "invoice": invoice[0],
                    "message": "Product Successfully Added to the system"
                })
            except:
                raise ValidationError("Failed to Create Invoice")
        else:
            raise ValidationError("Terminal Unavailable")

class GetInvoiceByID(generics.RetrieveAPIView):

    serializer_class = EceranInvoiceSerializers


    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request):
        nomor = self.request.GET['nomor']

        try:
            invoice_specific = EceranInvoice.objects.get(nomor=nomor)
            invoice = EceranInvoice.objects.filter(nomor=nomor)
            invoice = list(invoice.values())
            return Response({
                    "invoice": invoice[0],
                    "message": "Product retrived successfully"
            })
        except:
             raise ValidationError({'notFound' : 'Invoice with that ID not found.'})
