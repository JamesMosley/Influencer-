import React, { useState } from 'react';
import { Campaign, CampaignStatus } from './types';
import './CampaignDetails.css';
interface CampaignDetail extends Campaign{
  platform: string;
  targetAudience: string;
  instructions: string[];
  requiredDeliverables: string[];
}
const MocK_CAMPAIGN_DETAIL: CampaignDetail = {
    id: '1',
    name: 'Summer Product Launch',
    description: 'Promoting our new eco-friendly swimwear line across social channels.',
    status: 'Active',
    deadline: new Date('2026-07-15'),
    budget: 5000,
    platform: 'Instagram Reels, Facebook, Twitter, TikTok',
    targetAudience: 'Eco-conscious consumers, travelers aged 18-35',
    instructions: [
        'Create engaging short-form videos showcasing the swimwear in action.',
        'Feature the product clearly in the first 3 seconds of the video hook.',
    'Emphasize the 100% recycled ocean plastic material narrative naturally.',
    'Use the approved verbal call-to-action: "Click the link in my bio to find your fit."',
    'Do not display competing apparel brands or visible logos in the background.',
    'Ensure the campaign hashtag #EcoSwimLaunch is included in the video description.',
    'Submit the final video for review at least 48 hours before the campaign deadline.'
    ],
    requiredDeliverables: [
    '1x Instagram Reel (9:16 format, min 15s)',
    '1x TikTok Video matching the Reel creative',
    'Primary link inclusion in social bios for 48 hours post-launch',
    'Campaign performance report with engagement metrics and audience insights within 7 days after campaign end',
    'Creative assets (product images, logo, campaign hashtag) provided for content creation',
]

};
const statusClassMap: Record<CampaignStatus, string> = {
  Active: 'status-pill status-active',
  Paused: 'status-pill status-paused',
  Completed: 'status-pill status-completed',
};
