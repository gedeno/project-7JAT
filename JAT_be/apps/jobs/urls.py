from django.urls import URLPattern, path
from .import views

urlpatterns = [
    path('job/',views.CreateJobApiView.as_view())
]