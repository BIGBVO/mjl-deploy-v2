from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import AllTerminalSerializers, TerminalSerializers
from .models import Terminal
from users.models import User
from eceranInvoice.models import EceranInvoice
from eceranTransfer.models import EceranTransfer
from pengeluaran.models import Pengeluaran
from rest_framework import mixins

class GetAllTerminalName(generics.ListAPIView):
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = TerminalSerializers

    def get_queryset(self):
        user = User.objects.get(id=self.request.GET['id'])
        if "master" in list(user.groups.all().values_list('name',flat = True)):
            return Terminal.objects.all().order_by('nama')
        else :
            raise ValidationError({'permissionDenied' : "Permission Denied"})

class GetSummary(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = AllTerminalSerializers

    def get(self, request):
        
        terminal = Terminal.objects.get(nama=self.request.GET['terminal'])
        user = User.objects.get(id=self.request.GET['id'])

        regular_invoices = EceranInvoice.objects.filter(reset_id="", tipe="REGULAR", terminal=terminal).order_by('jam')
        void_invoices = EceranInvoice.objects.filter(reset_id="", tipe="VOID", terminal=terminal).order_by('jam')
        transfers = EceranTransfer.objects.filter(reset_id="", terminal=terminal).order_by('jam')
        pengeluaran = Pengeluaran.objects.filter(reset_id="", terminal=terminal).order_by('jam')

        list_regular = list(regular_invoices.values())
        list_void = list(void_invoices.values())
        list_transfer = list(transfers.values())
        list_pengeluaran = list(pengeluaran.values())

        report = {"terminal" : terminal.nama,
                  "saldo_awal" : terminal.saldo_awal,
                  "saldo_akhir" : terminal.saldo_akhir,
                  "total_regular" : terminal.total_penjualan,
                  "total_void" : terminal.total_void,
                  "total_pengeluaran" : terminal.total_pengeluaran,
                  "total_transfer" : terminal.total_transfer,}

        final_report = {'report' : report,
                        'regular_invoices' : list_regular,
                        'void_invoices': list_void,
                        'transfers': list_transfer,
                        'pengeluaran':list_pengeluaran}

        return Response({
            "report": final_report,
            "message" : "Report generated successfully"
        })

    

