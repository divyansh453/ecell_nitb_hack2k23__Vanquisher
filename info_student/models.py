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
    job_title=models.CharField(max_length=100)
    package=models.CharField(max_length=10)
    company=models.CharField(max_length=50)
    resources=models.TextField(max_length=500,null=True,blank=True)
    placement=models.CharField(max_length=20)
    cgpa=models.FloatField(validators=[MinValueValidator(1),MaxValueValidator(10)],null=True)

    def __str__(self):
        return self.full_name +" "+self.roll_number
    class Meta:
        ordering = ['-placement']
class Company_User(models.Model):  
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    company_name=models.CharField(max_length=100)
    employment_type= models.CharField(max_length=50)
    job_title=models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    email=models.EmailField(unique=False)
    def __str__(self):
        return self.company_name+" "+self.employment_type
class SearchJob(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    full_name=models.CharField(max_length=200,null=False)
    employment_type=models.CharField(max_length=50,null=False)
    job_title=models.CharField(max_length=50)
    email=models.EmailField(unique=True)
    mobile_number=models.CharField(max_length=10,unique=True)
    address=models.TextField(null=False)
    linkedin=models.CharField(max_length=15,null=True)
    def __str__(self):
        return self.full_name+" "+self.mobile_number





