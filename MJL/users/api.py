from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import UserSerializer, LoginSerializer, CreateUserSerializer
from .models import User
from terminal.models import Terminal
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError
from knox.models import AuthToken
import datetime

class LoginAPI(generics.GenericAPIView):

    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        username = request.data['username']
        password = request.data['password']
        terminal = request.data['terminal']
        print("masuk sini")
        print(terminal)
        f = open("users/log.txt", "a")
        f.write(str(datetime.datetime.now())[0:19] + " " + username + " log in -- ")
        try:
            user = authenticate(username=username, password=password)
            if user and user.is_active:
                if "master" in list(user.groups.all().values_list('name',flat = True)) :
                    terminal = Terminal.objects.get(nama="M1")
                else:
                    if (terminal == None):
                        f.write(str(request.data["terminal"]) + " -- failed.\n")
                        f.close()
                        raise ValidationError({'loginFail' : "device not supported."}) 
                    else:
                        try:    
                            terminal = Terminal.objects.get(nama=request.data["terminal"])
                        except Terminal.DoesNotExist:
                            f.write(str(request.data["terminal"]) + " -- failed.\n")
                            f.close()
                            raise ValidationError({'loginFail' : "device not supported."}) 
                    
                
                f.write(terminal.nama + " -- successful.\n")
                f.close()
                user_copy = {"id" : user.id,
                             "nama" : user.nama,
                             "penjualan_bulan_ini" : user.penjualan_bulan_ini,
                             "penjualan_quartar_ini" : user.penjualan_quartar_ini,
                             "groups" : list(user.groups.all().values_list('name',flat = True))}
                return Response({
                    "token": AuthToken.objects.create(user)[1],
                    "user":user_copy,
                    "terminal": terminal.nama
                })
            else:
                f.write(str(request.data["terminal"]) + " -- failed.\n")
                f.close()
                raise ValidationError({'loginFail' : "incorrect credentials"})

        except User.DoesNotExist:
            f.write(str(request.data["terminal"]) + " -- failed.\n")
            f.write("failed\n")
            f.close()
            raise ValidationError({'loginFail' : "No user with that username found"})

class CreateUserAPI(generics.GenericAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user_copy = {"username" : user.username,
                     "penjualan_bulan_ini" : user.penjualan_bulan_ini,
                     "penjualan_quartar_ini" : user.penjualan_quartar_ini}

        return Response({
            "token": AuthToken.objects.create(user)[1],
            "user":user_copy
        })
