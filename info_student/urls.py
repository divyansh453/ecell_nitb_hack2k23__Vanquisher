from django.urls import path,include
from  .views import *


urlpatterns = [
    path('student_form/<str:pk>',StudentView.as_view()),
    path('company_form/<str:pk>',CompanyView.as_view()),
    path('job_form/<str:pk>',SearchJobView.as_view()),
    path('admin_view/<str:course>/<str:branch>',AdminView.as_view()),
    path('admin_view_all/',AdminView_all.as_view()),
    path('admin_view_company/<str:company>',AdminView_Company.as_view()),
    path('admin_view_skill/<str:skill>',AdminView_Skill),
    path('admin_view_placement/<str:placement>',AdminView_Placement.as_view()),
    path('admin_view_employment/<str:employment>',AdminView_Employment_Type.as_view()),
    path('skill_view/',SkillView.as_view()),
    path('year_view/',YearAnalysisView.as_view()),
    path('admin_view_email/<str:pk>',CompanyEmailService.as_view()),
    path('resume_pdf/<str:pk>',ResumeView.as_view()),
    # path('recommendation/',hello_world),
    # path('response/<str:text>',gpt3)
]

