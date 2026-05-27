import React, { useState } from 'react';

export type CampaignStatus = 'Active' | 'Paused' | 'Completed';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  deadline: Date;
  budget: number;
}

// Mock data for demonstration
const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Summer Product Launch',
    description: 'Promoting our new eco-friendly swimwear line across social channels.',
    status: 'Active',
    deadline: new Date('2026-07-15'),
    budget: 5000,
  },
  {
    id: '2',
    name: 'Q2 Retargeting Blitz',
    description: 'Re-engaging cart abandoners with a 15% discount code.',
    status: 'Paused',
    deadline: new Date('2026-06-30'),
    budget: 2500,
  },
  {
    id: '3',
    name: 'Holiday Warm-up 2025',
    description: 'Early bird holiday shopping teasers and email newsletters.',
    status: 'Completed',
    deadline: new Date('2025-12-24'),
    budget: 12000,
  },
];

export const CampaignListPage: React.FC = () => {
  const [campaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [filter, setFilter] = useState<CampaignStatus | 'All'>('All');

  // Filter logic
  const filteredCampaigns = campaigns.filter(
    (campaign) => filter === 'All' || campaign.status === filter
  );

  // Helper to style status badges dynamically
  const getStatusBadgeClass = (status: CampaignStatus): string => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Paused':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return '';
    }
  };

  // Helper to check if deadline is urgent (less than 7 days away)
  const isUrgent = (deadline: Date): boolean => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-200 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Campaigns</h1>
          <p className="text-sm text-gray-500 mt-1">Track, manage, and monitor your active marketing sprints.</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4 md:mt-0 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
          {(['All', 'Active', 'Paused', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Grid/List */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-500 font-medium">No campaigns found matching "{filter}".</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <div 
              key={campaign.id} 
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
            >
              <div>
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeClass(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${campaign.budget.toLocaleString()}
                  </span>
                </div>

                {/* Campaign Info */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{campaign.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{campaign.description}</p>
              </div>

              {/* Deadline Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-4">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Deadline</span>
                <span className={`text-sm font-medium ${
                  isUrgent(campaign.deadline) && campaign.status === 'Active'
                    ? 'text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded'
                    : 'text-gray-700'
                }`}>
                  {campaign.deadline.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};