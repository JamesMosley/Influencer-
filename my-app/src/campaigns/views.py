# campaigns/views.py
from rest_framework import generics, permissions
from .models import Campaign
from .serializers import CampaignSerializer

class JoinedCampaignsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CampaignSerializer

    def get_queryset(self):
        user = self.request.user
        return Campaign.objects.filter(influencers=user).order_by('-deadline')