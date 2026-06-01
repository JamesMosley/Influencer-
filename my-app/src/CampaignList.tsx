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

const accentColorMap: Record<CampaignStatus, string> = {
  Active: 'bg-emerald-500',
  Paused: 'bg-amber-500',
  Completed: 'bg-gray-400',
};

const badgeStyleMap: Record<CampaignStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-800 border-emerald-300',
  Paused: 'bg-amber-50 text-amber-800 border-amber-300',
  Completed: 'bg-gray-100 text-gray-600 border-gray-300',
};

const isUrgent = (deadline: Date): boolean => {
  const diff = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diff > 0 && diff <= 7;
};

const fmtBudget = (n: number) => '$' + n.toLocaleString();
const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const CampaignListPage: React.FC = () => {
  const [campaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [filter, setFilter] = useState<CampaignStatus | 'All'>('All');

  const filtered = campaigns.filter(
    (c) => filter === 'All' || c.status === filter
  );

  const activeCount = campaigns.filter((c) => c.status === 'Active').length;
  const pausedCount = campaigns.filter((c) => c.status === 'Paused').length;
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
            Campaign Manager
          </p>
          <h1 className="text-3xl font-serif font-normal text-gray-900 leading-tight">
            Marketing{' '}
            <span className="italic text-blue-700">Campaigns</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <p className="text-sm text-gray-500">
              Track, manage, and monitor your active marketing sprints.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm self-start">
          {(['All', 'Active', 'Paused', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all tracking-wide ${
                filter === tab
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total campaigns', value: campaigns.length, sub: 'All statuses' },
          { label: 'Currently active', value: activeCount, sub: `${pausedCount} paused` },
          { label: 'Total budget', value: fmtBudget(totalBudget), sub: 'Across all campaigns' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-serif text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Campaign Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-400 text-sm">
          No campaigns found for &ldquo;{filter}&rdquo;.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((campaign) => {
            const urgent = isUrgent(campaign.deadline) && campaign.status === 'Active';
            return (
              <div
                key={campaign.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col hover:border-gray-300 transition-colors"
              >
                {/* Accent strip */}
                <div className={`h-[3px] w-full ${accentColorMap[campaign.status]}`} />

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Badge + Budget */}
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${badgeStyleMap[campaign.status]}`}
                    >
                      {campaign.status}
                    </span>
                    <span className="font-serif text-base text-gray-900">
                      {fmtBudget(campaign.budget)}
                    </span>
                  </div>

                  {/* Name & Description */}
                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                      {campaign.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {campaign.description}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                    Deadline
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      urgent
                        ? 'text-red-700 bg-red-50 px-2 py-0.5 rounded'
                        : 'text-gray-700'
                    }`}
                  >
                    {fmtDate(campaign.deadline)}
                    {urgent && ' · urgent'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};