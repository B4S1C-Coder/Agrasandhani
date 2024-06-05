from django.db import models
from django.core.validators import MinLengthValidator

class UploadedDocument(models.Model):
    associated_file = models.FileField(upload_to="uploads/", null=True, blank=True)
    sha512hash_file = models.CharField(max_length=128,
                            validators=[MinLengthValidator(128)])
    file_exists_irl = models.BooleanField(default=False)

class AssociatedQuestions(models.Model):
    associated_hash = models.CharField(max_length=128,
                            validators=[MinLengthValidator(128)])
    questions = models.JSONField()