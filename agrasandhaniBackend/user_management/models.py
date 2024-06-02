from django.db import models
from django.contrib.auth.models import User

# To-do: Decide whether user_avatar would be hosted through django
# or some other platform and add accordingly to the model
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=200, default="Hey there! I'm using Agrasandhani.")
    phone_no = models.CharField(max_length=10)
