from django.urls import path

from .api import CreateInvoice, GetInvoiceByID

urlpatterns = [
  path('api/veceran-invoiceo/create', CreateInvoice.as_view()),
  path('api/veceran-invoiceo/get', GetInvoiceByID.as_view()),
]
