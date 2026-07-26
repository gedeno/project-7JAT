from django.urls import path 
from .import views

urlpatterns = [
    path('applic/<int:pk>/', views.CreateApplictaionApiView.as_view()),
    path('apply/', views.GetMyApplicationsAPIView.as_view()),
    path('myapp/<int:pk>/',views.Myjobapps.as_view())
]