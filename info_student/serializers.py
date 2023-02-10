from rest_framework import serializers

from .models import *
from account.models import User

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student_Form
        fields=['student','skills','employment_type','package','company','resources','placement','cgpa','job_title']
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model=Company_User
        fields="__all__"
class SearchJobSerializer(serializers.ModelSerializer):
    class Meta:
        model=SearchJob
        fields="__all__"

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student_Form
        fields="__all__"


