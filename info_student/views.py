from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import permissions
from rest_framework.permissions  import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi 
from rest_framework.generics import ListCreateAPIView
from .serializers import StudentSerializer
from .models import Student_Form
from django.conf import settings
from django.utils.translation import gettext_lazy 
import json 
from account.models import User



class StudentView(ListCreateAPIView):
    serializer_class=StudentSerializer
    queryset=Student_Form.objects.all()
    def perform_create(self,serializer):
        pk=self.kwargs.get('pk')
        user=User.objects.get(id=pk)
        serializer.save(student=user,full_name=user.full_name,branch=user.branch,roll_number=user.roll_number)
    def get_queryset(self):
        pk=self.kwargs.get('pk')
        user=User.objects.get(id=pk)
        return self.queryset.filter(student=user)



