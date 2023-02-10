from django.db import models
from account.models import User
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator

class Student_Form(models.Model):
    student=models.OneToOneField(User,on_delete=models.CASCADE,unique=True)
    full_name=models.CharField(max_length=30)
    roll_number=models.CharField(max_length=20)
    branch=models.CharField(max_length=20)
    skills = ArrayField(models.CharField(max_length=20),blank=True)
    employment_type=models.CharField(max_length=100)
    package=models.CharField(max_length=10)
    company=models.CharField(max_length=50)
    resources=models.TextField(max_length=500,null=True)
    placement=models.CharField(max_length=9)
    cgpa=models.FloatField(validators=[MinValueValidator(1),MaxValueValidator(10)],null=True)

    def __str__(self):
        return self.full_name +" "+self.roll_number

