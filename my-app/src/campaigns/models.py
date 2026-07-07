# campaigns/models.py
from django.conf import settings
from django.db import models

class Campaign(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Paused', 'Paused'),
        ('Completed', 'Completed'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    deadline = models.DateField()
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    influencers = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='CampaignMembership',
        related_name='joined_campaigns'
    )

class CampaignMembership(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    influencer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('campaign', 'influencer')