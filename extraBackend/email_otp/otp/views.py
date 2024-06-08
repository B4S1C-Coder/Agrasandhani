from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.conf import settings
from .forms import EmailForm
from .utils import generate_otp

def send_otp_email(request):    
    if request.method == 'POST':
        form = EmailForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            otp = generate_otp()
            subject = 'Your OTP Code'
            message = f'Your OTP code is {otp}'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [email]
            send_mail(subject, message, email_from, recipient_list)
            return redirect('otp_sent')  # Redirect to the new view
    else:
        form = EmailForm()
    return render(request, 'otp/send_otp.html', {'form': form})

def otp_sent(request):
    return render(request, 'otp/sent_otp.html')