from django.urls import path

from .api import AddNewSupplier, GetAllSuppliersName

urlpatterns = [
  path('api/vsuppliero/add', AddNewSupplier.as_view()),
  path('api/vsuppliero/all-name', GetAllSuppliersName.as_view()),
]
