import { Mail, Eye, Play, Clock, BarChart2, MoreVertical } from 'lucide-react';
import type { Campaign } from '../types/types';
import { useState } from 'react';

// Props interface definition for CampaignList component
interface CampaignListProps {
  campaigns: Campaign[];
  onCreateNew: () => void;
}

export const CampaignList = ({ campaigns, onCreateNew }: CampaignListProps) => {
  // State to keep track of which campaign is expanded
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);

  // Toggles the expanded state of a campaign
  const toggleExpand = (id: string) => {
    setExpandedCampaign(expandedCampaign === id ? null : id);
  };

  // Utility function to return a CSS class based on the campaign status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card">
      {/* Header section with title and create button */}
      <div className="card-header">
        <h2 className="card-title">Campaigns</h2>
        <button onClick={onCreateNew} className="primary-button">
          Create New Campaign
        </button>
      </div>

      {/* Campaign list */}
      <div className="campaign-list">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="campaign-item">
            {/* Main row showing basic campaign info */}
            <div className="campaign-main" onClick={() => toggleExpand(campaign.id)}>
              <div className="campaign-icon">
                <Mail size={20} />
              </div>

              <div className="campaign-info">
                <div className="campaign-name">{campaign.name}</div>
                <div className="campaign-meta">
                  <span>Targeting {campaign.targetUsers} users</span>
                  {/* Status badge with dynamic styling */}
                  <span className={`status-badge ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  {/* Scheduled date/time display if available */}
                  {campaign.schedule && (
                    <span className="schedule-info">
                      <Clock size={14} />
                      {new Date(campaign.schedule).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons (stats, play, options) */}
              <div className="campaign-actions">
                <button className="action-button action-button-gray">
                  <BarChart2 size={16} />
                </button>
                <button className="action-button action-button-blue">
                  <Play size={16} />
                </button>
                <button className="action-button action-button-gray">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Expanded details section */}
            {expandedCampaign === campaign.id && (
              <div className="campaign-details">
                <div className="detail-row">
                  <span className="detail-label">Subject:</span>
                  <span>{campaign.subject}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">CTA:</span>
                  <span>{campaign.cta} ({campaign.ctaUrl})</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Created:</span>
                  <span>{new Date(campaign.id).toLocaleDateString()}</span>
                </div>

                {/* Action buttons in expanded view */}
                <div className="action-buttons">
                  <button className="secondary-button small">
                    <Eye size={14} />
                    Preview
                  </button>
                  <button className="secondary-button small">
                    Duplicate
                  </button>
                  <button className="secondary-button small">
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Fallback UI for when no campaigns are present */}
        {campaigns.length === 0 && (
          <div className="empty-state">
            <Mail size={64} className="empty-state-icon" />
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>No campaigns yet</p>
            <p>Create your first segment to get started with targeted campaigns.</p>
            <button onClick={onCreateNew} className="primary-button mt-4">
              Create First Campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
