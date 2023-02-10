from rest_framework import serializers

from .models import *
from account.models import User

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student_Form
        fields=['student','skills','employment_type','package','company','resources','placement','cgpa']


