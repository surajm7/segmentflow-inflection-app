// constants.ts

// Importing the User type definition
// constants.ts
// Importing the User type definition
import type { Campaign, User } from '../types/types';

/**
 * Mock user data to simulate real users in the system.
 * Each user object includes attributes like name, email, plan type,
 * last login date, features they used, and their company.
 */
export const mockUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@techcorp.com", plan: "Premium", lastLogin: "2025-06-18", featuresUsed: ["dashboard", "analytics", "api"], company: "TechCorp" },
  { id: 2, name: "Bob Smith", email: "bob@startupxyz.com", plan: "Free", lastLogin: "2025-06-15", featuresUsed: ["dashboard"], company: "StartupXYZ" },
  { id: 3, name: "Carol Davis", email: "carol@enterprise.com", plan: "Enterprise", lastLogin: "2025-06-19", featuresUsed: ["dashboard", "analytics", "api", "webhooks"], company: "Enterprise Inc" },
  { id: 4, name: "David Wilson", email: "david@scale.io", plan: "Premium", lastLogin: "2025-06-10", featuresUsed: ["dashboard", "api"], company: "Scale.io" },
  { id: 5, name: "Emma Brown", email: "emma@growth.co", plan: "Free", lastLogin: "2025-06-17", featuresUsed: ["dashboard", "analytics"], company: "Growth Co" },
  { id: 6, name: "Frank Miller", email: "frank@saas.com", plan: "Premium", lastLogin: "2025-06-05", featuresUsed: ["dashboard"], company: "SaaS Solutions" },
  { id: 7, name: "Grace Lee", email: "grace@fintech.io", plan: "Enterprise", lastLogin: "2025-06-19", featuresUsed: ["dashboard", "analytics", "api", "webhooks", "integrations"], company: "FinTech.io" },
  { id: 8, name: "Henry Taylor", email: "henry@mobile.app", plan: "Free", lastLogin: "2025-06-12", featuresUsed: ["dashboard"], company: "Mobile App Co" },
  { id: 9, name: "Irene Walker", email: "irene@designly.com", plan: "Premium", lastLogin: "2025-06-14", featuresUsed: ["dashboard", "analytics"], company: "Designly" },
  { id: 10, name: "Jake Thompson", email: "jake@logichub.io", plan: "Enterprise", lastLogin: "2025-06-20", featuresUsed: ["dashboard", "api", "webhooks"], company: "LogicHub" },
  { id: 11, name: "Kelly Martinez", email: "kelly@autoworks.ai", plan: "Free", lastLogin: "2025-06-13", featuresUsed: ["dashboard"], company: "AutoWorks AI" },
  { id: 12, name: "Liam Garcia", email: "liam@mediawave.com", plan: "Premium", lastLogin: "2025-06-16", featuresUsed: ["dashboard", "analytics", "api"], company: "MediaWave" },
  { id: 13, name: "Mia Patel", email: "mia@healthsync.io", plan: "Enterprise", lastLogin: "2025-06-18", featuresUsed: ["dashboard", "analytics", "api", "integrations"], company: "HealthSync" },
  { id: 14, name: "Nathan Scott", email: "nathan@projectflow.app", plan: "Free", lastLogin: "2025-06-11", featuresUsed: ["dashboard"], company: "ProjectFlow" },
  { id: 15, name: "Olivia Adams", email: "olivia@aiinsights.com", plan: "Premium", lastLogin: "2025-06-17", featuresUsed: ["dashboard", "api"], company: "AI Insights" },
  { id: 16, name: "Patrick Young", email: "patrick@edtechzone.com", plan: "Enterprise", lastLogin: "2025-06-19", featuresUsed: ["dashboard", "analytics", "webhooks", "integrations"], company: "EdTech Zone" },
  { id: 17, name: "Quinn Foster", email: "quinn@ecomgenius.io", plan: "Free", lastLogin: "2025-06-13", featuresUsed: ["dashboard"], company: "EcomGenius" },
  { id: 18, name: "Rachel Green", email: "rachel@insightify.com", plan: "Premium", lastLogin: "2025-06-15", featuresUsed: ["dashboard", "analytics"], company: "Insightify" },
  { id: 19, name: "Sam Harris", email: "sam@cybersecure.com", plan: "Enterprise", lastLogin: "2025-06-20", featuresUsed: ["dashboard", "api", "webhooks", "integrations", "analytics"], company: "CyberSecure" },
  { id: 20, name: "Tina Brooks", email: "tina@markethero.io", plan: "Free", lastLogin: "2025-06-10", featuresUsed: ["dashboard"], company: "MarketHero" }
];

/**
 * List of available features that users may interact with.
 * Used in filtering options and dropdowns.
 */
export const featureOptions = ["dashboard", "analytics", "api", "webhooks", "integrations"];

/**
 * Subscription plan options for users.
 * These correspond to different levels of access or capabilities.
 */
export const planOptions = ["Free", "Premium", "Enterprise"];

/**
 * Data for the user segment line chart over time.
 * Represents user count progression by week.
 */
export const userSegmentData = [
  { date: 'Jan 1', users: 5 },
  { date: 'Jan 8', users: 7 },
  { date: 'Jan 15', users: 8 },
  { date: 'Jan 22', users: 12 },
  { date: 'Jan 29', users: 15 },
  { date: 'Feb 5', users: 18 },
  { date: 'Feb 12', users: 22 },
  { date: 'Feb 19', users: 26 },
  { date: 'Feb 26', users: 29 },
  { date: 'Mar 4', users: 32 },
  { date: 'Mar 11', users: 34 },
  { date: 'Mar 18', users: 37 },
];

/**
 * Campaign performance data for bar charts or tables.
 * Each object includes metrics like open and click counts for different campaigns.
 */
export const campaignPerformanceData = [
  { name: 'Welcome Series', opens: 45, clicks: 23 },
  { name: 'Feature Update', opens: 32, clicks: 15 },
  { name: 'Promo Offer', opens: 28, clicks: 12 },
  { name: 'Webinar Invite', opens: 55, clicks: 30 },
  { name: 'Product Launch', opens: 60, clicks: 35 },
  { name: 'Re-engagement', opens: 20, clicks: 8 },
  { name: 'Survey Request', opens: 38, clicks: 18 },
];

export const demoCampaigns: Campaign[] = [
  {
    id: 'demo-onboarding',
    name: 'New User Onboarding',
    status: 'active',
    targetUsers: 1243,
    subject: "Welcome to Acme Inc - Let's get started!",
    content: `Hi there,

Thank you for choosing Acme Inc! Here's how to begin:

1. Complete your profile (2 minutes)
2. Connect your first data source
3. Explore our starter templates

Need help? Reply to this email anytime.

Cheers,
The Acme Team`,
    cta: 'Complete Setup',
    ctaUrl: 'https://app.acmeinc.com/onboarding',
    schedule: new Date(Date.now() + 3600000).toISOString(),
    segment: [] // Empty segment
  },
  {
    id: 'demo-newsletter',
    name: 'Monthly Newsletter',
    status: 'scheduled',
    targetUsers: 5821,
    subject: 'Your Monthly Product Updates',
    content: `Hi valued customer,

This month's highlights:

• New feature releases
• Upcoming webinars
• Customer success stories

We appreciate you being part of our community!`,
    cta: 'View Updates',
    ctaUrl: 'https://acmeinc.com/updates',
    schedule: new Date(Date.now() + 604800000).toISOString(),
    segment: [] // Empty segment
  },
  {
    id: 'demo-promo',
    name: 'Special Promotion',
    status: 'draft',
    targetUsers: 0, // Will be calculated
    subject: 'Limited-time offer just for you',
    content: `Hi friend,

We're offering an exclusive discount for our loyal users:

- 20% off annual plans
- Free implementation guide
- Priority support

This offer expires soon!`,
    cta: 'Claim Offer',
    ctaUrl: 'https://app.acmeinc.com/special-offer',
    segment: [] // Empty segment
  }
];

