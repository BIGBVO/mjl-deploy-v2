from django.urls import path

from .api import AddNewProduct, GetAllProducts,  \
  GetProductsByCategory, GetAllProductsCode, \
  GetSpecificProductX, GetSpecificProductS, \
  GetSpecificProductA, GetSpecificProductB, \
  GetAllProductsCategories, AddNewProductCategory, \
  EditProduct, DeleteProduct

urlpatterns = [
  path('api/vproducto/add', AddNewProduct.as_view()),
  path('api/vproducto/edit', EditProduct.as_view()),
  path('api/vproducto/delete', DeleteProduct.as_view()),
  path('api/vproducto/add-category', AddNewProductCategory.as_view()),
  path('api/vproducto/all', GetAllProducts.as_view()),
  path('api/vproducto/all-code', GetAllProductsCode.as_view()),
  path('api/vproducto/all-category', GetAllProductsCategories.as_view()),
  path('api/vproducto/category', GetProductsByCategory.as_view()),
  path('api/vproducto/codeX', GetSpecificProductX.as_view()),
  path('api/vproducto/codeS', GetSpecificProductS.as_view()),
  path('api/vproducto/codeA', GetSpecificProductA.as_view()),
  path('api/vproducto/codeB', GetSpecificProductB.as_view()),
]
