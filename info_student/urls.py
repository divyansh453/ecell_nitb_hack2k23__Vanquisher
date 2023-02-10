from django.urls import path,include
from  .views import *


urlpatterns = [
    path('student_form/',StudentView.as_view()),
]

