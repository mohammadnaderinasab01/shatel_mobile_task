from django.core.validators import FileExtensionValidator
from rest_framework import serializers
from .models import Information


class UploadFileRequestSerializer(serializers.ModelSerializer):
    upload_file = serializers.FileField(validators=[FileExtensionValidator(allowed_extensions=['xlsx'])])
    class Meta:
        model = Information
        fields = ('upload_file', )
        
class ReadInformationResultSerializer(serializers.ModelSerializer):
    user = serializers.RelatedField(read_only=True)
    class Meta:
        model = Information
        fields = ('user', 'national_ID', 'email')