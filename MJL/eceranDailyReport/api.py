from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import EceranDailyReportSerializers
from .models import EceranDailyReport
from terminal.models import Terminal
from users.models import User
from eceranInvoice.models import EceranInvoice
from eceranTransfer.models import EceranTransfer
from pengeluaran.models import Pengeluaran
from rest_framework import mixins
from rest_framework.exceptions import ValidationError
import datetime
import json

class CreateEceranDailyReport(generics.GenericAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = EceranDailyReportSerializers

    def post(self, request, *args, **kwargs):

        terminal = Terminal.objects.get(nama=request.data["terminal"])
        user = User.objects.get(id=request.data['id'])

        if (terminal.tipe == "KASIR"):
            #try:
            tanggal = datetime.datetime.now().strftime("%Y-%m-%d")
            jam = datetime.datetime.now().strftime("%H:%M:%S")
            year = datetime.datetime.now().strftime("%Y")[2:]
            month = datetime.datetime.now().strftime("%m")
            date = datetime.datetime.now().strftime("%d")
            
            prefix = year+month+date+ "-" + request.data["terminal"]
            pre_report = EceranDailyReport.objects.filter(id__contains=prefix).order_by('-id').first()

            if pre_report is not None:
                num = int(pre_report.id[10:])+1
            else:
                num = 1
            
            id = '{prefix}-{num:02d}'.format(prefix=prefix, num=num)
            print(id)
            saldo_akhir = terminal.saldo_akhir

            if (int(request.data['penarikan']) > saldo_akhir):
                raise ValidationError({
                    "failed": "Penarikan can't be greater than saldo"
                })

            else :
                saldo_akhir -= int(request.data['penarikan'])
                
                data = {"id" : id,
                        "user" : user.username,
                        "terminal" : request.data["terminal"],
                        "tanggal" : tanggal,
                        "jam" : jam,
                        "saldo_awal" : terminal.saldo_awal,
                        "total_regular" : terminal.total_penjualan,
                        "total_void" : terminal.total_void,
                        "total_transfer" : terminal.total_transfer,
                        "total_pengeluaran" : terminal.total_pengeluaran,
                        "penarikan" : request.data['penarikan'],
                        "saldo_akhir" : saldo_akhir
                        }

                serializer = self.get_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                report = serializer.save()

                regular_invoices = EceranInvoice.objects.filter(reset_id="", tipe="REGULAR", terminal=terminal).order_by('tanggal')
                void_invoices = EceranInvoice.objects.filter(reset_id="", tipe="VOID", terminal=terminal).order_by('tanggal')
                transfers = EceranTransfer.objects.filter(reset_id="", terminal=terminal).order_by('jam')
                pengeluaran = Pengeluaran.objects.filter(reset_id="", terminal=terminal).order_by('jam')

                terminal.saldo_awal = saldo_akhir
                terminal.saldo_akhir = saldo_akhir
                terminal.total_penjualan = 0
                terminal.total_void = 0
                terminal.total_pengeluaran = 0
                terminal.total_transfer = 0
                terminal.save()

                list_regular = list(regular_invoices.values())
                list_void = list(void_invoices.values())
                list_transfer = list(transfers.values())
                list_pengeluaran = list(pengeluaran.values())

                for invoice in regular_invoices:
                    invoice.reset_id = report.id
                    invoice.save()
            
                for invoice in void_invoices:
                    invoice.reset_id = report.id
                    invoice.save()
                
                for tf in transfers:
                    tf.reset_id = report.id
                    tf.save()
                
                for p in pengeluaran:
                    p.reset_id = report.id
                    p.save()

                report_copy = {"id" : report.id,
                               "user" : report.user.username,
                               "terminal" : report.terminal.nama,
                               "jam" : report.jam,
                               "tanggal" : report.tanggal,
                               "saldo_awal" : report.saldo_awal,
                               "total_regular" : report.total_regular,
                               "total_void" : report.total_void,
                               "total_pengeluaran" : report.total_pengeluaran,
                               "total_transfer" : report.total_transfer,
                               "penarikan" : report.penarikan,
                               "saldo_akhir" : report.saldo_akhir}

                final_report = {'report' : report_copy,
                                'regular_invoices' : list_regular,
                                'void_invoices': list_void,
                                'transfers': list_transfer,
                                'pengeluaran':list_pengeluaran}

                return Response({
                    "report": final_report,
                    "message" : "Report generated successfully"
                })
        #    except:
        #        raise ValidationError("failed" : "failed to generate report.")
        else:
            raise ValidationError({"terminal_unavailable": "Device Not Available"})