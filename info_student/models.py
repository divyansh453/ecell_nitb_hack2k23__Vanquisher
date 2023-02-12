from django.db import models
from account.models import User
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from datetime import date
import datetime

class Student_Form(models.Model):
    student=models.OneToOneField(User,on_delete=models.CASCADE,unique=True)
    full_name=models.CharField(max_length=30)
    roll_number=models.CharField(max_length=20)
    branch=models.CharField(max_length=20)
    course=models.CharField(max_length=10)
    skills = ArrayField(models.CharField(max_length=20),blank=True)
    employment_type=models.CharField(max_length=100)
    job_title=models.CharField(max_length=100)
    package=models.CharField(max_length=10)
    company=models.CharField(max_length=50)
    resources=models.TextField(max_length=500,null=True,blank=True)
    placement=models.CharField(max_length=20)
    cgpa=models.FloatField(validators=[MinValueValidator(1),MaxValueValidator(10)],null=True)
    date=models.DateField(default=date.today())

    def __str__(self):
        return self.full_name +" "+self.roll_number
    class Meta:
        ordering = ['-placement']
    @property
    def Days_till(self):
        today=date.today()
        days_till=today-self.date
        days_till=str(days_till)
        days_till=days_till.split(' d',1)
        days_till=days_till[0]
        days_till=int(days_till)
        return days_till
    @property
    def year_(self):
        day_now=str(self.date)
        day_now=day_now[0:4]
        return day_now
    
class Company_User(models.Model):  
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    company_name=models.CharField(max_length=100)
    employment_type= models.CharField(max_length=50)
    job_title=models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    email=models.EmailField(unique=False)
    cgpa=models.FloatField(validators=[MinValueValidator(1),MaxValueValidator(10)],null=False)
    def __str__(self):
        return self.company_name+" "+self.employment_type
class SearchJob(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    full_name=models.CharField(max_length=200,null=False)
    employment_type=models.CharField(max_length=50,null=False)
    job_title=models.CharField(max_length=50)
    email=models.EmailField()
    mobile_number=models.CharField(max_length=10)
    address=models.TextField(null=False)
    cgpa=models.FloatField(validators=[MinValueValidator(1),MaxValueValidator(10)],null=False)
    linkedin=models.CharField(max_length=15,null=True)
    def __str__(self):
        return self.full_name+" "+self.mobile_number
class Skills(models.Model):
    skill=models.CharField(max_length=20)
    rate=models.IntegerField()
    def __str__(self):
        return self.skill+" "+str(self.rate)
    class Meta:
        ordering=['-rate']
class Year(models.Model):
    year=models.CharField(max_length=4)
    stu_no=models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(1000)],null=True)
    def __str__(self):
        return self.year+" "+str(self.stu_no)
class Email_to_Companies(models.Model):
    admin=models.ForeignKey(User,on_delete=models.CASCADE)
    email=models.EmailField()
    company=models.CharField(max_length=50)

    def __str__(self):
        return self.company+"'s Mail "
class Resume(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    resume=models.FileField(blank=True,null=True)
    def __str__(self):
        return str(self.user)+"'s Resume"
