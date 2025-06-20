import { Mail, Eye, Play, Clock, BarChart2, MoreVertical } from 'lucide-react';
import type { Campaign } from '../types/types';
import { useState } from 'react';
import { demoCampaigns } from '../constants';

interface CampaignListProps {
  campaigns: Campaign[];
  onCreateNew: () => void;
}

export const CampaignList = ({ campaigns, onCreateNew }: CampaignListProps) => {
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);
  
 
  // Display real campaigns first, then permanent demo campaigns
  const displayCampaigns = [...campaigns, ...demoCampaigns];

  const toggleExpand = (id: string) => {
    setExpandedCampaign(expandedCampaign === id ? null : id);
  };

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
      <div className="card-header">
        <h2 className="card-title">Campaigns</h2>
        <button onClick={onCreateNew} className="primary-button">
          Create New Campaign
        </button>
      </div>

      <div className="campaign-list">
        {displayCampaigns.map(campaign => (
          <div key={campaign.id} className={`campaign-item ${campaign.id.startsWith('demo-') ? 'demo-campaign' : ''}`}>
            <div className="campaign-main" onClick={() => toggleExpand(campaign.id)}>
              <div className="campaign-icon">
                <Mail size={20} />
              </div>

              <div className="campaign-info">
                <div className="campaign-name">
                  {campaign.name}
                  {campaign.id.startsWith('demo-') && (
                    <span className="demo-badge">Example</span>
                  )}
                </div>
                <div className="campaign-meta">
                  <span>Targeting {campaign.targetUsers} users</span>
                  <span className={`status-badge ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  {campaign.schedule && (
                    <span className="schedule-info">
                      <Clock size={14} />
                      {new Date(campaign.schedule).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="campaign-actions">
                <button className="action-button action-button-gray">
                  <BarChart2 size={16} />
                </button>
                {!campaign.id.startsWith('demo-') && (
                  <button className="action-button action-button-blue">
                    <Play size={16} />
                  </button>
                )}
                <button className="action-button action-button-gray">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {expandedCampaign === campaign.id && (
              <div className="campaign-details">
                <div className="detail-row">
                  <span className="detail-label">Subject:</span>
                  <span>{campaign.subject}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Content:</span>
                  <span>{campaign.content || 'No content yet'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">CTA:</span>
                  <span>{campaign.cta} ({campaign.ctaUrl})</span>
                </div>
                {!campaign.id.startsWith('demo-') && (
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
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};