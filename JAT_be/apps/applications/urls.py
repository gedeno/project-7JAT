from django.urls import path 
from .import views

urlpatterns = [
    path('applic/<int:pk>', views.CreateApplictaionApiView.as_view())
]