from django.urls import path,include
from  .views import *


urlpatterns = [
    path('student_form/<str:pk>',StudentView.as_view()),
    path('company_form/<str:pk>',CompanyView.as_view()),
    path('job_form/<str:pk>',SearchJobView.as_view()),
    path('admin_view/<str:course>/<str:branch>',AdminView.as_view()),
    path('admin_view_all/',AdminView_all.as_view()),
    path('admin_view_company/<str:company>',AdminView_Company.as_view()),
    path('skill_view/',SkillView.as_view()),
    path('response/<str:text>',gpt3)
]

