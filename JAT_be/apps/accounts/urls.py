from django.urls import URLPattern, include, path 
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
    "user",
    views.CreateUserApiView,basename='user'

)

urlpatterns = [
    path('', include(router.urls))
]