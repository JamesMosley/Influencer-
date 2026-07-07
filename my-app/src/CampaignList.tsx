import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export type CampaignStatus = 'Active' | 'Paused' | 'Completed';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  deadline: Date;
  budget: number;
  posts?: Post[];
}

export interface Post {
  id: string;
  date: Date;
  platform?: string;
  caption?: string;
  engagements: {
    likes: number;
    shares: number;
    comments: number;
  };
}

const normalizePost = (post: any): Post => ({
  ...post,
  date: new Date(post.date),
});

const normalizeCampaign = (campaign: any): Campaign => ({
  ...campaign,
  deadline: new Date(campaign.deadline),
  posts: campaign.posts?.map(normalizePost),
});

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Summer Product Launch',
    description: 'Promoting our new eco-friendly swimwear line across social channels.',
    status: 'Active',
    deadline: new Date('2026-07-15'),
    budget: 5000,
    posts: [
      {
        id: 'p1',
        date: new Date('2026-06-01'),
        platform: 'Instagram',
        caption: 'Sneak peek!',
        engagements: { likes: 1200, shares: 45, comments: 80 },
      },
      {
        id: 'p2',
        date: new Date('2026-06-05'),
        platform: 'TikTok',
        caption: 'Launch teaser',
        engagements: { likes: 4200, shares: 210, comments: 340 },
      },
    ],
  },
  {
    id: '2',
    name: 'Q2 Retargeting Blitz',
    description: 'Re-engaging cart abandoners with a 15% discount code.',
    status: 'Paused',
    deadline: new Date('2026-06-30'),
    budget: 2500,
    posts: [
      {
        id: 'p3',
        date: new Date('2026-05-20'),
        platform: 'Facebook',
        caption: 'Retargeting ad',
        engagements: { likes: 300, shares: 12, comments: 6 },
      },
    ],
  },
  {
    id: '3',
    name: 'Holiday Warm-up 2025',
    description: 'Early bird holiday shopping teasers and email newsletters.',
    status: 'Completed',
    deadline: new Date('2025-12-24'),
    budget: 12000,
    posts: [
      {
        id: 'p4',
        date: new Date('2025-11-15'),
        platform: 'Email',
        caption: 'Holiday sneak',
        engagements: { likes: 0, shares: 0, comments: 0 },
      },
    ],
  },
];

const statusClassMap: Record<CampaignStatus, string> = {
  Active: 'status-pill status-active',
  Paused: 'status-pill status-paused',
  Completed: 'status-pill status-completed',
};

const accentClassMap: Record<CampaignStatus, string> = {
  Active: 'campaign-card-accent accent-active',
  Paused: 'campaign-card-accent accent-paused',
  Completed: 'campaign-card-accent accent-completed',
};

const isUrgent = (deadline: Date): boolean => {
  const diff = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diff > 0 && diff <= 7;
};

const fmtBudget = (n: number) => '$' + n.toLocaleString();
const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const CampaignListPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [filter, setFilter] = useState<CampaignStatus | 'All'>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const loadJoinedCampaigns = async () => {
      setIsLoading(true);
      setFetchError(null);

      try {
        const response = await fetch('/api/influencer/joined-campaigns/', {
          credentials: 'include',
          headers: { 'Accept': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Failed to load campaigns: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const campaignsFromApi = Array.isArray(data) ? data.map(normalizeCampaign) : [];
        setCampaigns(campaignsFromApi);
      } catch (error) {
        setFetchError(error instanceof Error ? error.message : 'Unable to load joined campaigns.');
      } finally {
        setIsLoading(false);
      }
    };

    loadJoinedCampaigns();
  }, []);

  const filtered = campaigns.filter((campaign) => filter === 'All' || campaign.status === filter);
  const activeCount = campaigns.filter((campaign) => campaign.status === 'Active').length;
  const pausedCount = campaigns.filter((campaign) => campaign.status === 'Paused').length;
  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalPosts = campaigns.reduce((sum, c) => sum + (c.posts ? c.posts.length : 0), 0);

  const sumEngagements = (posts?: Post[]) => {
    if (!posts || posts.length === 0) return { likes: 0, shares: 0, comments: 0 };
    return posts.reduce(
      (acc, p) => ({
        likes: acc.likes + p.engagements.likes,
        shares: acc.shares + p.engagements.shares,
        comments: acc.comments + p.engagements.comments,
      }),
      { likes: 0, shares: 0, comments: 0 }
    );
  };

  const overallEngagement = campaigns.reduce(
    (acc, c) => {
      const s = sumEngagements(c.posts);
      return { likes: acc.likes + s.likes, shares: acc.shares + s.shares, comments: acc.comments + s.comments };
    },
    { likes: 0, shares: 0, comments: 0 }
  );

  return (
    <div className="campaign-page">
      <div className="campaign-shell">
        <section className="campaign-hero">
          <div className="hero-copy">
            <p className="hero-eyebrow">Influencer Campaigns</p>
            <h1 className="hero-title">Present your campaign portfolio with confidence.</h1>
            <p className="hero-text">
              A polished marketing dashboard for stakeholder reviews, featuring clear campaign status,
              budget visibility, and delivery timing.
            </p>
          </div>

          <div className="campaign-snapshot">
            <div className="snapshot-card">
              <p className="snapshot-label">Current active</p>
              <p className="snapshot-value">{activeCount}</p>
            </div>
            <div className="snapshot-card">
              <p className="snapshot-label">Budget pool</p>
              <p className="snapshot-value">{fmtBudget(totalBudget)}</p>
            </div>
          </div>
          {isLoading && (
            <div className="loading-state">Loading joined campaigns...</div>
          )}
          {fetchError && (
            <div className="error-state">Unable to load campaigns: {fetchError}</div>
          )}
        </section>

        <div className="campaign-controls">
          <div className="stats-grid">
            {[
              { label: 'Total campaigns', value: campaigns.length, sub: 'All statuses' },
              { label: 'Active on deck', value: activeCount, sub: `${pausedCount} paused` },
              { label: 'Total posts', value: totalPosts, sub: 'Submitted across campaigns' },
              { label: 'Total budget', value: fmtBudget(totalBudget), sub: 'Across initiatives' },
              { label: 'Est. engagements', value: `${overallEngagement.likes.toLocaleString()} ❤ • ${overallEngagement.shares.toLocaleString()} ↻ • ${overallEngagement.comments.toLocaleString()} 💬`, sub: 'Likes • Shares • Comments' },
            ].map((stat) => (
              <div key={stat.label} className="stats-card">
                <p className="stats-label">{stat.label}</p>
                <p className="stats-value">{stat.value}</p>
                <p className="stats-sub">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="campaign-filter-bar">
            {(['All', 'Active', 'Paused', 'Completed'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`campaign-filter-button ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="no-results">
            No campaigns found for “{filter}”. Adjust the filter to show results.
          </div>
        ) : (
          <div className="cards-grid">
            {filtered.map((campaign) => {
              const urgent = isUrgent(campaign.deadline) && campaign.status === 'Active';
              const postCount = campaign.posts ? campaign.posts.length : 0;
              const engagementSummary = sumEngagements(campaign.posts);
              const recentPost = campaign.posts && campaign.posts.length > 0 ? campaign.posts.reduce((a, b) => (a.date > b.date ? a : b)) : null;

              return (
                <Link 
                  to={`/campaign/${campaign.id}`} 
                  key={campaign.id} 
                  className="campaign-card-link"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <article className="campaign-card">
                    <div className={accentClassMap[campaign.status]} />
                    <div className="campaign-card-body">
                      <div className="campaign-card-top">
                        <span className={statusClassMap[campaign.status]}>{campaign.status}</span>
                        <span className="campaign-budget">{fmtBudget(campaign.budget)}</span>
                      </div>

                      <div>
                        <h2 className="campaign-title">{campaign.name}</h2>
                        <p className="campaign-description">{campaign.description}</p>
                        <div className="campaign-post-metrics">
                          <small className="post-count">Posts: {postCount}</small>
                          {recentPost && (
                            <small className="recent-post">Last: {fmtDate(recentPost.date)}</small>
                          )}
                          <small className="engagement-summary">Est: {engagementSummary.likes} ❤ • {engagementSummary.shares} ↻ • {engagementSummary.comments} 💬</small>
                        </div>
                      </div>
                    </div>

                    <div className="campaign-card-footer">
                      <span className="deadline-label">Deadline</span>
                      <span className={`campaign-deadline ${urgent ? 'urgent' : ''}`}>
                        {fmtDate(campaign.deadline)}{urgent ? ' · urgent' : ''}
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        <div className="campaign-footer-note">
          Use this dashboard to showcase campaign pacing, live budgets, and delivery timelines.
          The card-based layout keeps each initiative clear for stakeholders and executives.
        </div>
      </div>
    </div>
  );
};
