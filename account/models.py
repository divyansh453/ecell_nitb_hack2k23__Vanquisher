from django.db import models
from django.urls import reverse
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.validators import MinValueValidator, MaxValueValidator





class UserManager(BaseUserManager):
    def create_user(self,roll_number,branch,course,email, full_name ,age,cgpa, gender,mobile_number,password2, password=None):
        """
        Creates and saves a User with the given email, name ,tc and password.
        """
        if not mobile_number:
            raise ValueError('Users must have a Mobile Number.')
        if not roll_number:
            raise ValueError('Users must have a Roll number.')
        if not email:
            raise ValueError('Users must have a Email.')

        user = self.model(
            roll_number=roll_number,
            branch=branch,
            course=course,
            cgpa=cgpa,
            mobile_number=mobile_number,
            email=self.normalize_email(email),
            full_name=full_name,
            gender=gender,
            age=age,
            password2=password2
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,roll_number,branch,email,course,cgpa, full_name  ,age, gender,mobile_number,password2,password=None):
        """
        Creates and saves a superuser with the given email, name , tc and password.
        """
        if not mobile_number:
            raise ValueError('Users must have a Mobile number.')
        if not roll_number:
            raise ValueError('Users must have a Roll number.')
        if not email:
            raise ValueError('Users must have a Email.')
        user = self.create_user(
            roll_number=roll_number,
            branch=branch,
            course=course,
            cgpa=cgpa,
            mobile_number=mobile_number,
            password=password,
            email=email,
            full_name=full_name,
            gender=gender,
            age=age,
            password2=password2
            
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    full_name=models.CharField(max_length=30)
    branch=models.CharField(max_length=20)
    course=models.CharField(max_length=10)
    email=models.EmailField(unique=True)
    mobile_number=models.CharField(max_length=10,unique=True)
    roll_number=models.CharField(max_length=20,unique=True)
    gender=models.CharField(max_length=10,null=True)
    age=models.IntegerField(validators=[MinValueValidator(18),MaxValueValidator(60)])
    isverified=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    password2=models.CharField(max_length=40)
    cgpa=models.FloatField(validators=[MinValueValidator(1),MaxValueValidator(10)],null=False)



    objects=UserManager()


    USERNAME_FIELD='roll_number'
    REQUIRED_FIELDS= ['email','mobile_number','full_name','branch','course','age','gender','password2','cgpa']

    def __str__(self):
        return self.full_name+  ' , ' +self.roll_number

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

    def tokens(self):
        refresh=RefreshToken.for_user(self)
        return{
            'refresh': str(refresh),
            'access':str(refresh.access_token)
        }


# Create your models here.