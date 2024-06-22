from . import views
from django.urls import path


urlpatterns = [
    path('upload_file/', views.UploadFileView.as_view(), name='upload_file'),
    path('get_user_related_informations/', views.InformationView.as_view(), name='get_user_related_informations'),
    path('send_mail/', views.SendMailView.as_view(), name='send_mail'),
]
