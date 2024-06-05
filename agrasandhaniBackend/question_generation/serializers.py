from rest_framework import serializers
from .models import UploadedDocument, AssociatedQuestions

class UploadedDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedDocument
        fields = ['id', 'associated_file', 'sha512hash_file']
        extra_kwargs = {
            'sha512hash_file': {
                'required': False,
            }
        }

class AssociatedQuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssociatedQuestions
        fields = "__all__"