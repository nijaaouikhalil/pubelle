from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator




class MyProfileManager(BaseUserManager):
    def create_user(self,name, email, username,
                     password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have an username")
   
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            name=name,
        )
        user.set_password(password)
        #user.image='/defaultimage.png',
        user.description='default'
        user.job='Freelencer'
        user.is_available=True
        user.price=0
        user.is_active=True

        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, name,password=None):

        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
            name=name,
            
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_active=True
        user.save(using=self._db)
        return user

      
class Profile(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    image = models.ImageField(null=True, blank=True,  default='/defaultimage.png')
    _id = models.AutoField(primary_key=True, editable=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = MyProfileManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','name']


    def __str__(self):
        return self.email
    
    
    def has_perm(self, perm, obj=None):
        return self.is_admin

   

    def has_module_perms(self, app_label):
        return True

class Point(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True,related_name="user")
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str((self.user))