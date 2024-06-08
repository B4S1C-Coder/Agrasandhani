from django.urls import path
from .views import send_otp_email, otp_sent

urlpatterns = [
    path('send-otp/', send_otp_email, name='send_otp_email'),
    path('sent-otp/', otp_sent, name='otp_sent'),  
]
