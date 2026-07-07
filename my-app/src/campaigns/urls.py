# campaigns/urls.py
from django.urls import path
from .views import JoinedCampaignsView

urlpatterns = [
    path('api/influencer/joined-campaigns/', JoinedCampaignsView.as_view(), name='joined-campaigns'),
]