from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import AddProductSerializers, ProductSerializers, ProductCodeSerializers,\
                         SpecificProductSerializers, ProductCategorySerializers, UpdateProductSerializers

from .models import Product, ProductCategory
from suppliers.models import Supplier
from rest_framework import mixins
from rest_framework.exceptions import ValidationError

class AddNewProduct(generics.GenericAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = AddProductSerializers

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        return Response({
            "message": "Product Successfully Added to the system"
        })

class EditProduct(generics.UpdateAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UpdateProductSerializers

    def post(self, request, *args, **kwargs):
        try:
            product = Product.objects.get(kode=request.data['kode'])
            kategori = ProductCategory.objects.get(nama=request.data['kategori'])
            supplier = Supplier.objects.get(nama_supplier=request.data['supplier'])
            
            if (request.data['kode'] != request.data['kode_baru']):
                if (Product.objects.get(kode=request.data['kode_baru'])):
                    raise ValidationError({"productExist" : "Failed: product with this code already exist"})

            product.kode = request.data['kode_baru']
            product.nama = request.data['nama']
            product.kategori = kategori
            product.quantity = request.data['quantity']
            product.supplier = supplier
            product.modal = request.data['modal']
            product.pengangkutan = request.data['pengangkutan']
            product.harga_S = request.data['harga_S']
            product.harga_A = request.data['harga_A']
            product.harga_B = request.data['harga_B']
            
            product.save()
            
            if (request.data['gambar'] != ""):
                serializer = self.get_serializer(product, data=request.data)
                serializer.is_valid(raise_exception=True)
                product = serializer.save()

            gambar_url = ""
            if (product.gambar == ""):
                gambar_url = "static/product_pictures/no_image.jpeg"
            else:
                gambar_url = product.gambar.url

            product_copy = {"kode" : product.kode,
                            "nama" : product.nama,
                            "kategori": product.kategori.nama,
                            "quantity": product.quantity,
                            "supplier": product.supplier.nama_supplier,
                            "modal" : product.modal,
                            "pengangkutan" : product.pengangkutan,
                            "harga_S" : product.harga_S,
                            "harga_A" : product.harga_A,
                            "harga_B" : product.harga_B,
                            "stok" : product.stok,
                            "po" : product.po,
                            "otw" : product.otw,
                            "gambar" : gambar_url}

            return Response({
                "product": product_copy,
                "message": "Product retrived successfully"
            })

        except Product.DoesNotExist:
            raise ValidationError("Product Does Not Exist")


class DeleteProduct(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = ProductCodeSerializers
    def delete(self, request):
        try:
            product = Product.objects.get(kode=request.data['kode'])
            product.delete()
            return Response({"message": "Product deleted successfully"})
        except Product.DoesNotExist:
            raise ValidationError({"notFound" : "Product Does Not Exist"})


class AddNewProductCategory(generics.GenericAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ProductCategorySerializers

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        customer = serializer.save()
        return Response({
            "message": "Product Category Successfully Added to the system"
        })


class GetAllProducts(generics.ListAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ProductSerializers

    def get_queryset(self):
        return Product.objects.all().order_by('kode')

class GetAllProductsCode(generics.ListAPIView):

    serializer_class = ProductCodeSerializers

    permissions_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return Product.objects.all().order_by('kode')

class GetProductsByCategory(generics.ListAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    serializer_class = ProductSerializers

    def get_queryset(self):
        kategori = self.request.GET['kategori']
        return Product.objects.filter(kategori=kategori).order_by('kode')

class GetSpecificProductX(generics.RetrieveAPIView):

    serializer_class = SpecificProductSerializers

    def get(self, request):
        try:
            product = Product.objects.get(kode=request.GET.get('kode'))
            gambar_url = ""
            if (product.gambar == ""):
                gambar_url = "static/product_pictures/no_image.jpeg"
            else:
                gambar_url = product.gambar.url
            product_copy = {"kode" : product.kode,
                            "nama" : product.nama,
                            "kategori": product.kategori.nama,
                            "quantity": product.quantity,
                            "supplier": product.supplier.nama_supplier,
                            "modal" : product.modal,
                            "pengangkutan" : product.pengangkutan,
                            "harga_S" : product.harga_S,
                            "harga_A" : product.harga_A,
                            "harga_B" : product.harga_B,
                            "stok" : product.stok,
                            "po" : product.po,
                            "otw" : product.otw,
                            "gambar" : gambar_url}

            return Response({
                "product": product_copy,
                "message": "Product retrived successfully"
            })

        except Product.DoesNotExist:
            raise ValidationError("Product Does Not Exist")

class GetSpecificProductS(generics.RetrieveAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = SpecificProductSerializers

    def get(self, request):
        try:
            product = Product.objects.get(kode=request.GET.get('kode'))
            gambar_url = ""
            if (product.gambar == ""):
                gambar_url = "static/product_pictures/no_image.jpeg"
            else:
                gambar_url = product.gambar.url
            product_copy = {"kode" : product.kode,
                            "nama" : product.nama,
                            "kategori" : product.kategori.nama,
                            "quantity" : product.quantity,
                            "harga_S" : product.harga_S,
                            "harga_A" : product.harga_A,
                            "harga_B" : product.harga_B,
                            "stok" : product.stok,
                            "po" : product.po,
                            "otw" : product.otw,
                            "gambar": gambar_url}
            return Response({
                "product": product_copy,
                "message": "Product retrived successfully"
            })
        except Product.DoesNotExist:
            raise ValidationError("Product Does Not Exist")

class GetSpecificProductA(generics.RetrieveAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = SpecificProductSerializers

    def get(self, request):
        try:
            product = Product.objects.get(kode=request.GET.get('kode'))
            gambar_url = ""
            if (product.gambar == ""):
                gambar_url = "static/product_pictures/no_image.jpeg"
            else:
                gambar_url = product.gambar.url
            product_copy = {"kode" : product.kode,
                            "nama" : product.nama,
                            "kategori" : product.kategori.nama,
                            "quantity" : product.quantity,
                            "harga" : product.harga_B,
                            "stok" : product.stok,
                            "po" : product.po,
                            "otw" : product.otw,
                            "gambar": gambar_url}
            return Response({
                "product": product_copy,
                "message": "Product retrived successfully"
            })
        except Product.DoesNotExist:
            raise ValidationError("Product Does Not Exist")

class GetSpecificProductB(generics.RetrieveAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = SpecificProductSerializers

    def get(self, request):
        try:
            product = Product.objects.get(kode=request.GET.get('kode'))
            gambar_url = ""
            if (product.gambar == ""):
                gambar_url = "static/product_pictures/no_image.jpeg"
            else:
                gambar_url = product.gambar.url

            product_copy = {"kode" : product.kode,
                            "nama" : product.nama,
                            "kategori" : product.kategori.nama,
                            "quantity" : product.quantity,
                            "harga" : product.harga_C,
                            "stok" : product.stok,
                            "po" : product.po,
                            "otw" : product.otw,
                            "gambar": gambar_url}
            return Response({
                "product": product_copy,
                "message": "Product retrived successfully"
            })
        except Product.DoesNotExist:
            raise ValidationError("Product Does Not Exist")


class GetAllProductsCategories(generics.ListAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ProductCategorySerializers

    def get_queryset(self):
        return ProductCategory.objects.all().order_by('nama')

