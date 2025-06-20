// types.ts
export interface User {
  id: number;
  name: string;
  email: string;
  plan: string;
  lastLogin: string;
  featuresUsed: string[];
  company: string;
}

export interface SegmentFilter {
  id: string;
  type: 'lastLogin' | 'featuresUsed' | 'plan';
  operator: 'before' | 'after' | 'includes' | 'excludes' | 'equals';
  value: string | number;
  logic?: 'AND' | 'OR';
}

export interface CampaignModalProps {
  campaign: Partial<Campaign>;
  userCount: number;
  onClose: () => void;
  onSave: () => void;
  onUpdate: (updates: Partial<Campaign>) => void;
}


export interface Campaign {
  id: string;
  name: string;
  segment: SegmentFilter[];
  subject: string;
  content: string;
  cta: string;
  ctaUrl: string;
  status: 'draft' | 'scheduled' | 'sent';
  targetUsers: number;
}
export interface Campaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  cta: string;
  ctaUrl: string;
  schedule?: string; // ISO string for scheduled date/time
  // Add other properties as needed
}

export type ActiveTab = 'segments' | 'campaigns' | 'analytics';