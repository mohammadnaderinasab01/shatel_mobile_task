from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UploadFileRequestSerializer
from drf_spectacular.utils import extend_schema
from rest_framework.parsers import MultiPartParser
from authentication.permission import UserAccessPermission
from django.core.mail import send_mail
from .models import Information, EmailTemplate
from time import sleep
import pandas as pd
from dotenv import load_dotenv
import os
load_dotenv()


class UploadFileView(APIView):
    parser_classes = (MultiPartParser,)
    permission_classes = [UserAccessPermission]
    @extend_schema(
        request=UploadFileRequestSerializer
    )
    def post(self, request):
        try:
            serializer = UploadFileRequestSerializer(data=request.data)
            if serializer.is_valid():
                uploaded_file = request.FILES['upload_file']
                file_df = pd.read_excel(uploaded_file)
                objs = [Information(user=None if request.user.is_anonymous else request.user, national_ID=col['NID'], email=col['email']) for row, col in file_df.iterrows()]
                Information.objects.bulk_create(objs=objs, batch_size=len(file_df.values))
                return Response({
                    'validationMessage': [{
                        'statusCode': status.HTTP_201_CREATED,
                        'message': 'All items created successfully'
                    }],
                    'result': None,
                    'resultStatus': 0
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    'validationMessage': [{
                        'statusCode': status.HTTP_400_BAD_REQUEST,
                        'message': 'Invalid file format'
                    }],
                    'result': None,
                    'resultStatus': 1
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'validationMessage': [{
                    'statusCode': status.HTTP_400_BAD_REQUEST,
                    'message': str(e)
                }],
                'result': None,
                'resultStatus': 1
            }, status=status.HTTP_400_BAD_REQUEST)
            
            

class InformationView(APIView):
    permission_classes = [UserAccessPermission]
    def get(self, request):
        try:
            informations = Information.objects.filter(user_id=request.user.id).values('email', 'national_ID')
            return Response({
                'validationMessage': [{
                    'statusCode': status.HTTP_200_OK,
                    'message': 'successful'
                }],
                'result': informations,
                'resultStatus': 0
            }, status=status.HTTP_200_OK)    
        except Exception as e:
            return Response({
                'validationMessage': [{
                    'statusCode': status.HTTP_400_BAD_REQUEST,
                    'message': str(e)
                }],
                'result': None,
                'resultStatus': 1
            }, status=status.HTTP_400_BAD_REQUEST)
            
            
            

class SendMailView(APIView):
    permission_classes = [UserAccessPermission]
    def get(self, request):
        try:
            informations = Information.objects.filter(user_id=request.user.id).values('email')
            email_template = EmailTemplate.objects.all().values('title', 'content').first()
            emails = []
            for info in informations:
                emails.append(info['email'])
            send_mail( 
                email_template['title'],
                email_template['content'],
                os.getenv('EMAIL_HOST_USER', 'mohammadnaderinasab099123@gmail.com'), # Admin
                emails,
                True
            )
            sleep(8)
            return Response({
                'validationMessage': [{
                    'statusCode': status.HTTP_200_OK,
                    'message': 'All E-mails were sent successfully'
                }],
                'result': None,
                'resultStatus': 0
            }, status=status.HTTP_200_OK)    
        except Exception as e:
            return Response({
                'validationMessage': [{
                    'statusCode': status.HTTP_400_BAD_REQUEST,
                    'message': str(e)
                }],
                'result': None,
                'resultStatus': 1
            }, status=status.HTTP_400_BAD_REQUEST)
            
            