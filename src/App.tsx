import { useState, useMemo } from 'react';

// UI Icons
import { Filter, Mail, BarChart3, Plus, Send } from 'lucide-react';

// Mock data and constants
import { mockUsers } from './constants';

// Types for users, filters, campaigns, and tabs
import type { SegmentFilter, Campaign, ActiveTab } from './types/types';
// import "./index.css"
// If your CSS file is located elsewhere, update the path accordingly, for example:
// import "./styles/index.css"

// App components
import { Header } from './components/Header';
import { TabButton } from './components/TabButton';
import { FilterCard } from './components/FilterCard';
import { UserList } from './components/UserList';
import { CampaignModal } from './components/CampaignModal';
import { CampaignList } from './components/CampaignList';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

// Main component
export const SegmentFlow = () => {
  // State for active tab: "segments", "campaigns", "analytics"
  const [activeTab, setActiveTab] = useState<ActiveTab>('segments');

  // State for segment filters applied
  const [filters, setFilters] = useState<SegmentFilter[]>([]);

  // State for stored campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // State for currently edited or created campaign
  const [currentCampaign, setCurrentCampaign] = useState<Partial<Campaign>>({});

  // State for modal visibility
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  // Derived list of users based on applied filters
  const filteredUsers = useMemo(() => {
    if (filters.length === 0) return mockUsers;

    return mockUsers.filter(user => {
      return filters.every((filter, index) => {
        const prevLogic = index > 0 ? filters[index - 1].logic : 'AND';
        let matches = false;

        // Logic for each filter type
        switch (filter.type) {
          case 'lastLogin':
            const daysDiff = Math.floor((new Date().getTime() - new Date(user.lastLogin).getTime()) / (1000 * 60 * 60 * 24));
            matches = filter.operator === 'before' 
              ? daysDiff > Number(filter.value)
              : daysDiff <= Number(filter.value);
            break;
          case 'featuresUsed':
            matches = filter.operator === 'includes'
              ? user.featuresUsed.includes(filter.value as string)
              : !user.featuresUsed.includes(filter.value as string);
            break;
          case 'plan':
            matches = user.plan === filter.value;
            break;
        }

        // For now, only 'AND' logic is treated — could be extended to OR
        return prevLogic === 'AND' ? matches : matches;
      });
    });
  }, [filters]);

  // Add a new default filter
  const addFilter = () => {
    const newFilter: SegmentFilter = {
      id: Date.now().toString(),
      type: 'lastLogin',
      operator: 'before',
      value: 7,
      logic: filters.length > 0 ? 'AND' : undefined
    };
    setFilters([...filters, newFilter]);
  };

  // Update an existing filter by ID
  const updateFilter = (id: string, updates: Partial<SegmentFilter>) => {
    setFilters(filters.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  // Remove a filter by ID
  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  // Create a new campaign based on the current segment
  const createCampaign = () => {
    setCurrentCampaign({
      name: '',
      segment: [...filters],
      subject: '',
      content: '',
      cta: 'Get Started',
      ctaUrl: 'https://example.com',
      status: 'draft'
    });
    setShowCampaignModal(true);
  };

  // Save the campaign to the list
  const saveCampaign = () => {
    if (currentCampaign.name && currentCampaign.subject) {
      const { id, ...rest } = currentCampaign as Campaign;
      const campaign: Campaign = {
        id: Date.now().toString(),
        ...rest,
        targetUsers: filteredUsers.length
      };
      setCampaigns([...campaigns, campaign]);
      setShowCampaignModal(false);
      setCurrentCampaign({});
    }
  };

  return (
    <div className="app-container">
      {/* Header showing total targeted users */}
      <Header userCount={filteredUsers.length} />

      <div className="main-container">
        {/* Tab Navigation */}
        <div className="tab-container">
          <TabButton 
            tab="segments" 
            icon={<Filter size={16} />}
            activeTab={activeTab}
            onClick={setActiveTab}
          >
            Segment Builder
          </TabButton>
          <TabButton 
            tab="campaigns" 
            icon={<Mail size={16} />}
            activeTab={activeTab}
            onClick={setActiveTab}
          >
            Campaigns
          </TabButton>
          <TabButton 
            tab="analytics" 
            icon={<BarChart3 size={16} />}
            activeTab={activeTab}
            onClick={setActiveTab}
          >
            Analytics
          </TabButton>
        </div>

        {/* Segment Builder View */}
        {activeTab === 'segments' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
            <div className="card">
              {/* Segment Filter Section */}
              <div className="card-header">
                <h2 className="card-title">Segment Filters</h2>
                <button onClick={addFilter} className="primary-button">
                  <Plus size={16} />
                  Add Filter
                </button>
              </div>

              {/* Render all filters */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filters.map((filter, index) => (
                  <FilterCard
                    key={filter.id}
                    filter={filter}
                    index={index}
                    onUpdate={updateFilter}
                    onRemove={removeFilter}
                  />
                ))}

                {/* Empty State when no filters are applied */}
                {filters.length === 0 && (
                  <div className="empty-state">
                    <Filter size={48} className="empty-state-icon" />
                    <p>No filters added yet. Click "Add Filter" to start building your segment.</p>
                  </div>
                )}
              </div>

              {/* CTA to create campaign */}
              {filters.length > 0 && (
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                  <button onClick={createCampaign} className="gradient-button">
                    <Send size={16} />
                    Create Campaign for This Segment
                  </button>
                </div>
              )}
            </div>

            {/* Matching Users List */}
            <UserList users={filteredUsers} />
          </div>
        )}

        {/* Campaigns Tab View */}
        {activeTab === 'campaigns' && (
          <CampaignList 
            campaigns={campaigns} 
            onCreateNew={() => setActiveTab('segments')} 
          />
        )}

        {/* Analytics Tab View */}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </div>

      {/* Campaign Modal */}
      {showCampaignModal && (
        <CampaignModal
          campaign={currentCampaign}
          userCount={filteredUsers.length}
          onClose={() => setShowCampaignModal(false)}
          onSave={saveCampaign}
          onUpdate={(updates) => setCurrentCampaign({ ...currentCampaign, ...updates })}
        />
      )}
    </div>
  );
};

export default SegmentFlow;
