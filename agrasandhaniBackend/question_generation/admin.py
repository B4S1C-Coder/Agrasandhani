from django.contrib import admin
from .models import UploadedDocument, AssociatedQuestions

# Register your models here.
admin.site.register(UploadedDocument)
admin.site.register(AssociatedQuestions)