from django.urls import path
from . import views

urlpatterns = [
    path("latex/", views.GenerateLatexExpressionFromImage.as_view(), name="generatelatex"),
]