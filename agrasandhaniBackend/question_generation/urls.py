from django.urls import path
from . import views

urlpatterns = [
    path('generate/', views.GenerateQuestionsFromDocumentView.as_view(), name="generatequesfromdoc"),
]