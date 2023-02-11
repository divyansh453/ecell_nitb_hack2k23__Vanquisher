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
from .serializers import *
from .models import *
from django.conf import settings
from django.utils.translation import gettext_lazy 
import json 
from account.models import User
from .utils import Util
class StudentView(ListCreateAPIView):
    serializer_class=StudentSerializer
    queryset=Student_Form.objects.all()
    skill=[]
    def perform_create(self,serializer):
        job_title=serializer.validated_data["job_title"]
        skills=serializer.validated_data["skills"]
        skill_set=Skills.objects.all()
        # print(type(skill_set))
        print(skills)
        print(skill_set)
        sk=[]
        for skill_ in skill_set:
            sk.append(skill_.skill)
        for skil in skills:
            if skil  not in  sk:
                print(skil)
                data={
                    "skill":skil,
                    "rate":1
                }
                skills_set=SkillSerializer(data=data)
                if skills_set.is_valid():
                    print("valid")
                    skills_set.save()
            else:
                s=Skills.objects.get(skill=skil)
                s.rate+=1
                s.save()

        job_title=job_title.title()
        pk=self.kwargs.get('pk')
        user=User.objects.get(id=pk)
        serializer.save(student=user,full_name=user.full_name,branch=user.branch,roll_number=user.roll_number,job_title=job_title)
    def get_queryset(self):
        pk=self.kwargs.get('pk')
        user=User.objects.get(id=pk)
        return self.queryset.filter(student=user)
class CompanyView(ListCreateAPIView):
    serializer_class=CompanySerializer
    queryset=Company_User.objects.all()
    def perform_create(self,serializer):
        pk=self.kwargs.get("pk")
        job=serializer.validated_data["job_title"]
        job=job.title()
        user=User.objects.get(id=pk)
        user_email=SearchJob.objects.filter(job_title=job)
        email_of_all=[]
        users_all=[]
        for users in user_email:
            users_all.append(users)
            email_of_all.append(users.email)
        for user_email in users_all:
            email_body = 'Hi '+user.full_name + \
            '\nThis candidate is elligible for the job offred by you.\nDetails of User:\n'+\
                'Name:'+user_email.full_name+'\nPhone_number:'+user_email.mobile_number+'\nEmail:\n'+user_email.email
            data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Elligible Candidate'}
            Util.send_email(data)
        serializer.save(user=user)
    def get_queryset(self):
        pk=self.kwargs.get("pk")
        user=User.objects.get(id=pk)
        return self.queryset.filter(user=user)
class SearchJobView(ListCreateAPIView):
    serializer_class=SearchJobSerializer
    queryset=SearchJob.objects.all()
    def perform_create(self,serializer):
        pk=self.kwargs.get('pk')
        user=User.objects.get(id=pk)
        job_title=serializer.validated_data["job_title"]
        job=job_title.title()
        serializer.save(user=user,full_name=user.full_name,email=user.email,job_title=job)
    def get_queryset(self):
        pk=self.kwargs.get('pk')
        user=User.objects.get(id=pk)
        return self.queryset.filter(user=user)

class AdminView(ListCreateAPIView):
    serializer_class=AdminSerializer
    queryset=Student_Form.objects.all()
    try:
        for user in queryset:
            if user.Days_till>1460:
                user.delete()
    except:
        b=1
    def get_queryset(self):
        return self.queryset.filter()
class SkillView(ListCreateAPIView):
    serializer_class=SkillSerializer
    queryset=Skills.objects.all()
    def perform_create(self,serializer):
        serializer.save()