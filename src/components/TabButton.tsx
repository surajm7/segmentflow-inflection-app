import type { ActiveTab } from '../types/types';

// Props interface for TabButton component
interface TabButtonProps {
  tab: ActiveTab;                     // The tab this button represents
  icon: React.ReactNode;              // Icon to display on the button
  children: React.ReactNode;          // Label/content inside the button
  activeTab: ActiveTab;               // Currently active tab
  onClick: (tab: ActiveTab) => void;  // Callback when the button is clicked
}

// Stateless functional component to render a styled tab button
export const TabButton = ({ tab, icon, children, activeTab, onClick }: TabButtonProps) => (
  <button
    onClick={() => onClick(tab)} // Triggers tab change
    className={`tab-button ${activeTab === tab ? 'active' : 'inactive'}`} // Conditional styling
  >
    {icon}     {/* Render the passed icon */}
    {children} {/* Render the button label/content */}
  </button>
);
