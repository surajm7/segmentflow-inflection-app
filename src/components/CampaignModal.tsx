import { Send, Clock, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Campaign } from '../types/types';
import { format } from 'date-fns';

// Props interface for CampaignModal
interface CampaignModalProps {
  campaign: Partial<Campaign>;
  userCount: number;
  onClose: () => void;
  onSave: () => void;
  onUpdate: (updates: Partial<Campaign>) => void;
}

export const CampaignModal = ({ campaign, userCount, onClose, onSave, onUpdate }: CampaignModalProps) => {
  // Local state management
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('12:00');
  const [isTestMode, setIsTestMode] = useState(false);
  const [testEmail, setTestEmail] = useState('');

  // On component mount, set the default schedule date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setScheduleDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Toggle scheduling on or off
  const handleScheduleToggle = () => {
    setIsScheduled(!isScheduled);
    onUpdate({ schedule: !isScheduled ? `${scheduleDate}T${scheduleTime}` : undefined });
  };

  // Mock handler for sending a test email
  const handleTestSend = () => {
    if (testEmail) {
      alert(`Test email sent to ${testEmail}`);
      // This would be replaced with an actual API call in production
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-2xl w-full">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Create Campaign</h2>
          <p className="modal-subtitle">
            Targeting {userCount} users with current segment
          </p>
        </div>

        {/* Modal Body */}
        <div className="modal-body space-y-6">
          {/* Basic Campaign Information Section */}
          <div className="space-y-4">
            {/* Campaign Name Input */}
            <div className="form-group">
              <label className="label">Campaign Name</label>
              <input
                type="text"
                value={campaign.name || ''}
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="text-input"
                placeholder="e.g., Premium Feature Activation"
              />
            </div>

            {/* Email Subject Input */}
            <div className="form-group">
              <label className="label">Email Subject</label>
              <input
                type="text"
                value={campaign.subject || ''}
                onChange={(e) => onUpdate({ subject: e.target.value })}
                className="text-input"
                placeholder="e.g., Unlock powerful analytics for your team"
              />
            </div>

            {/* Email Content Textarea */}
            <div className="form-group">
              <label className="label">Email Content</label>
              <textarea
                value={campaign.content || ''}
                onChange={(e) => onUpdate({ content: e.target.value })}
                className="textarea min-h-[150px]"
                placeholder="Write your campaign message..."
              />
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Call to Action</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CTA Button Text */}
              <div className="form-group">
                <label className="label">CTA Button Text</label>
                <input
                  type="text"
                  value={campaign.cta || ''}
                  onChange={(e) => onUpdate({ cta: e.target.value })}
                  className="text-input"
                  placeholder="Get Started"
                />
              </div>

              {/* CTA URL */}
              <div className="form-group">
                <label className="label">CTA URL</label>
                <input
                  type="url"
                  value={campaign.ctaUrl || ''}
                  onChange={(e) => onUpdate({ ctaUrl: e.target.value })}
                  className="text-input"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Schedule Campaign Section */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Schedule Toggle Button */}
                <button
                  onClick={handleScheduleToggle}
                  className={`p-1 rounded-full transition-colors ${
                    isScheduled ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}
                >
                  {isScheduled ? (
                    <ToggleRight className="text-indigo-600" size={20} />
                  ) : (
                    <ToggleLeft className="text-gray-500" size={20} />
                  )}
                </button>
                <h3 className="text-sm font-medium text-gray-700">Schedule Campaign</h3>
              </div>
              {/* Display selected date and time if scheduled */}
              {isScheduled && (
                <span className="text-xs text-gray-500">
                  {format(new Date(`${scheduleDate}T${scheduleTime}`), 'MMM d, yyyy h:mm a')}
                </span>
              )}
            </div>

            {/* Schedule Date and Time Picker */}
            {isScheduled && (
              <div className="space-y-4 pl-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date Picker */}
                  <div className="form-group">
                    <label className="label">Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => {
                          setScheduleDate(e.target.value);
                          onUpdate({ schedule: `${e.target.value}T${scheduleTime}` });
                        }}
                        min={new Date().toISOString().split('T')[0]}
                        className="text-input pl-10 w-full"
                      />
                    </div>
                  </div>

                  {/* Time Picker */}
                  <div className="form-group">
                    <label className="label">Time</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <select
                        value={scheduleTime}
                        onChange={(e) => {
                          setScheduleTime(e.target.value);
                          onUpdate({ schedule: `${scheduleDate}T${e.target.value}` });
                        }}
                        className="text-input pl-10 w-full"
                      >
                        {/* Generate time options every 15 minutes */}
                        {Array.from({ length: 24 * 4 }, (_, i) => {
                          const hours = Math.floor(i / 4);
                          const minutes = (i % 4) * 15;
                          const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                          return (
                            <option key={timeString} value={timeString}>
                              {format(new Date(`2000-01-01T${timeString}`), 'h:mm a')}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Test Email Section */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Test Mode Toggle */}
                <button
                  onClick={() => setIsTestMode(!isTestMode)}
                  className="toggle-button"
                >
                  {isTestMode ? <ToggleRight color="#4f46e5" /> : <ToggleLeft />}
                </button>
                <h3 className="text-sm font-medium text-gray-700">Send Test Email</h3>
              </div>
            </div>

            {/* Test Email Input */}
            {isTestMode && (
              <div className="space-y-4 pl-9">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="form-group md:col-span-4">
                    <label className="label">Test Email Address</label>
                    <input
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      className="text-input"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="form-group md:col-span-1 flex items-end">
                    <button
                      onClick={handleTestSend}
                      className="secondary-button w-full"
                      disabled={!testEmail}
                    >
                      Send Test
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer: Cancel and Save/Schedule */}
          <div className="modal-footer">
            <button
              onClick={onClose}
              className="secondary-button"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="primary-button"
              disabled={!campaign.name || !campaign.subject}
            >
              <Send size={16} />
              {isScheduled ? 'Schedule Campaign' : 'Save Campaign'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
