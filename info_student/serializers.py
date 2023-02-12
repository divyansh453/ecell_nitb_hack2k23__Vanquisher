from rest_framework import serializers

from .models import *
from account.models import User

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student_Form
        fields=['student','skills','employment_type','package','company','resources','placement','course','job_title']
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
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skills
        fields="__all__"
class YearAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model=Year
        fields="__all__"
class CompanyEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Email_to_Companies
        fields="__all__"
class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Resume
        fields=['resume']


