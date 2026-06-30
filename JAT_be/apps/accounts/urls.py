from django.urls import URLPattern, path
from . import views

urlpatterns = [
    path('user/', views.CreateUserApiView.as_view())
]