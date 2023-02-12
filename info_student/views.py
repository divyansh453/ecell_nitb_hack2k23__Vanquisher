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
from .utils import Util,Utill
class StudentView(ListCreateAPIView):
    serializer_class=StudentSerializer
    queryset=Student_Form.objects.all()
    skill=[]
    def perform_create(self,serializer):
        job_title=serializer.validated_data["job_title"]
        skills=serializer.validated_data["skills"]
        company=serializer.validated_data["company"]
        placement=serializer.validated_data["placement"]
        employment=serializer.validated_data["employment_type"]
        company=company.title()
        skill_set=Skills.objects.all()
        sk=[]
       

        for skill_ in skill_set:
            sk.append(skill_.skill)
        for skil in skills:
            if skil  not in  sk:
                data={
                    "skill":skil,
                    "rate":1
                }
                skills_set=SkillSerializer(data=data)
                if skills_set.is_valid():
                    skills_set.save()
            else:
                s=Skills.objects.get(skill=skil)
                s.rate+=1
                s.save()

        job_title=job_title.title()
        pk=self.kwargs.get('pk')
        user=User.objects.get(id=pk)
        course=user.course.upper()
        branch=user.branch.upper()
        placement=placement.upper()
        employment=employment.title()
        serializer.save(student=user,full_name=user.full_name,branch=branch,roll_number=user.roll_number,job_title=job_title,course=course,company=company,placement=placement,employment_type=employment)
        serializer=YearAnalysisSerializer
        year=[]
        year_set=Year.objects.all()
        queryset=Student_Form.objects.all()
        ski=[]
        today=date.today()
        years=str(today)
        year_=years[0:4]
        for years in year_set:
            ski.append(years.year)
        if year_ not in ski:
            data={
                    "year":year_,
                    "stu_no":1
                }
            year_set=YearAnalysisSerializer(data=data)
            if year_set.is_valid():
                year_set.save()
        else:
            s=Year.objects.get(year=year_)
            s.stu_no+=1
            s.save()
            

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
        pk=self.kwargs.get('pk')
        user=User.objects.get(id=pk)
        company_email=Company_User.objects.filter(job_title=job_title)
        email_of_all=[]
        users_all=[]
        name_of_all=''
        b=0
        for company in company_email:
            email_of_all.append(company)
            b=b+1
            name_of_all=str(b)+name_of_all+company.company_name+'\n'
        for company_email in email_of_all:
            email_body = 'Hi '+company_email.company_name + \
            '\nThis candidate is elligible for the job offered by you for the post of '+job_title+'.\nDetails of User:\n'+\
                'Name:'+user.full_name+'\nPhone_number:'+user.mobile_number+'\nEmail:\n'+user.email
            data = {'email_body': email_body, 'to_email': company_email.email,
                'email_subject': 'Elligible Candidate'}
            Util.send_email(data)
        if company_email:
            email_body = 'Hi '+user.full_name + \
            '\nYour Candidature has been considered by these companies for the post of '+job_title+'\nCompanies:\n'+name_of_all
            data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Elligible Candidate'}
            Util.send_email(data)
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
        course=self.kwargs.get('course')
        branch=self.kwargs.get('branch')
        if course and branch:
            course=course.upper()
            branch=branch.upper()
            return self.queryset.filter(course=course,branch=branch)
class AdminView_all(ListCreateAPIView):
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
class AdminView_Company(ListCreateAPIView):
    serializer_class=AdminSerializer
    queryset=Student_Form.objects.all()
    def get_queryset(self):
        company=self.kwargs.get('company')
        company=company.title()
        return self.queryset.filter(company=company)
class AdminView_Placement(ListCreateAPIView):
    serializer_class=AdminSerializer
    queryset=Student_Form.objects.all()
    def get_queryset(self):
        placement=self.kwargs.get('placement')
        placement=placement.upper()
        return self.queryset.filter(placement=placement)
class AdminView_Employment_Type(ListCreateAPIView):
    serializer_class=AdminSerializer
    queryset=Student_Form.objects.all()
    def get_queryset(self):
        employment=self.kwargs.get('employment')
        employment=employment.title()
        return self.queryset.filter(employment_type=employment)
@api_view(['GET'])
def  AdminView_Skill(request,skill):
    student=Student_Form.objects.all()
    user=[]
    for skill_set in student:
        if skill in skill_set.skills:
            user.append(skill_set)
    serializer=AdminSerializer(user,many=True)
    return Response(serializer.data)
class SkillView(ListCreateAPIView):
    serializer_class=SkillSerializer
    queryset=Skills.objects.all()
    def perform_create(self,serializer):
        serializer.save()
import openai
@api_view(['GET'])
def gpt3(request,text):
    stext="Urls of 5 best courses  for "+text +"."
    openai.api_key='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'
    response=openai.Completion.create(
        engine="davinci-instruct-beta",
        prompt=stext,
        temperature=0.1,
        max_tokens=1000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=["\"\"\""]
     )
  
    content=response.choices[0].text.split(".")
    a=response.choices[0].text
    response = openai.Image.create(
    prompt=" Search   "+text+"computer programming language coding  Images. ",
    n=1,
    size="1024x1024"
    )
    image_url = response['data'][0]['url']
    return Response({"About":a,"image_url":image_url})
class YearAnalysisView(ListCreateAPIView):
    serializer_class=YearAnalysisSerializer
    queryset=Year.objects.all()
    def get_queryset(self):
        return self.queryset.filter()
class CompanyEmailService(ListCreateAPIView):
    serializer_class=CompanyEmailSerializer
    queryset=Email_to_Companies.objects.all()
    def perform_create(self,serializer):
        pk=self.kwargs.get("pk")
        company=serializer.validated_data["company"]
        email=serializer.validated_data["email"]
        user=User.objects.get(id=pk)
        if user.is_admin:
            data = {'to_email': email,'employer':company,'phone':user.mobile_number,
                'email_subject': 'Request for Jobs','user_name':user.full_name}
            Utill.send_email(data)
            serializer.save()



    

    