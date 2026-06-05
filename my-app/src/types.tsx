export type CampaignStatus = 'Active' | 'Paused' | 'Completed';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  deadline: Date;
  budget: number;
}