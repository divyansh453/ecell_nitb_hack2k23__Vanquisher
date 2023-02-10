from django.urls import path,include
from  .views import *


urlpatterns = [
    path('student_form/<str:pk>',StudentView.as_view()),
]

