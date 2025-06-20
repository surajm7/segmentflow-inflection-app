import type { SegmentFilter } from '../types/types';
import { featureOptions, planOptions } from '../constants';

interface FilterCardProps {
  filter: SegmentFilter;
  index: number;
  onUpdate: (id: string, updates: Partial<SegmentFilter>) => void;
  onRemove: (id: string) => void;
}

// Type-safe operator options for each filter type
const operatorOptions = {
  lastLogin: ['before', 'after'] as const,
  featuresUsed: ['includes', 'excludes'] as const,
  plan: ['equals'] as const
};

// Helper function to generate descriptive labels
const getFilterDescription = (filter: SegmentFilter): string => {
  switch (filter.type) {
    case 'lastLogin':
      return `User logged in ${filter.operator} ${filter.value} days ago`;
    case 'featuresUsed':
      return `User ${filter.operator} feature: ${filter.value}`;
    case 'plan':
      return `User's plan ${filter.operator} ${filter.value}`;
    default:
      return '';
  }
};

export const FilterCard = ({ filter, index, onUpdate, onRemove }: FilterCardProps) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as SegmentFilter['type'];
    
    // Reset to default values when type changes
    const updates: Partial<SegmentFilter> = { type: newType };
    
    if (newType === 'lastLogin') {
      updates.operator = 'before';
      updates.value = 7;
    } else if (newType === 'featuresUsed') {
      updates.operator = 'includes';
      updates.value = featureOptions[0];
    } else if (newType === 'plan') {
      updates.operator = 'equals';
      updates.value = planOptions[0];
    }
    
    onUpdate(filter.id, updates);
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate(
      filter.id,
      {
        operator: e.target.value as (typeof operatorOptions)[typeof filter.type][number]
      }
    );
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value: string | number = e.target.value;
    
    if (filter.type === 'lastLogin') {
      const numValue = parseInt(value, 10);
      if (isNaN(numValue)) return; // Skip invalid numbers
      value = Math.max(0, numValue); // Ensure non-negative
    }
    
    onUpdate(filter.id, { value });
  };

  // Validate current filter value
  const isValid = () => {
    if (filter.type === 'lastLogin') {
      return typeof filter.value === 'number' && filter.value >= 0;
    }
    if (filter.type === 'featuresUsed') {
      return featureOptions.includes(filter.value as string);
    }
    if (filter.type === 'plan') {
      return planOptions.includes(filter.value as string);
    }
    return false;
  };

  return (
  
    <div key={filter.id} className="filter-card">
      {index > 0 && (
        <div className="logic-connector">
          <select
            value={filter.logic}
            onChange={(e) => onUpdate(filter.id, { logic: e.target.value as 'AND' | 'OR' })}
            className="select"
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>
      )}
      
      <div className="filter-description">
        {getFilterDescription(filter)}
      </div>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label className="filter-label">Filter Type</label>
          <select
            value={filter.type}
            onChange={handleTypeChange}
            className="select"
          >
            <option value="lastLogin">Last Login</option>
            <option value="featuresUsed">Features Used</option>
            <option value="plan">Plan</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Operator</label>
          <select
            value={filter.operator}
            onChange={handleOperatorChange}
            className="select"
          >
            {operatorOptions[filter.type].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            {filter.type === 'lastLogin' ? 'Days' : 'Value'}
          </label>
          <div className="value-control">
            {filter.type === 'lastLogin' ? (
              <input
                type="number"
                min="0"
                value={filter.value}
                onChange={handleValueChange}
                className="input"
                placeholder="days"
              />
            ) : (
              <select
                value={filter.value}
                onChange={handleValueChange}
                className="select"
              >
                {(filter.type === 'featuresUsed' ? featureOptions : planOptions).map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            <button
              onClick={() => onRemove(filter.id)}
              className="remove-button"
            >
              ×
            </button>
          </div>
        </div>
      </div>
      {!isValid() && (
        <div className="error-message">
          Invalid filter value
        </div>
      )}
    </div>

  );
};