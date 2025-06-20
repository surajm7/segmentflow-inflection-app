import { Target } from 'lucide-react';
import { memo } from 'react';

// Props interface with JS Doc comments for better documentation
interface HeaderProps {
  /**
   * Number of users in the current segment
   * @default 0
   */
  userCount?: number;
  
  /**
   * Optional callback when logo is clicked
   */
  onLogoClick?: () => void;
}

/**
 * Header component displaying logo and user count
 * @component
 * @example
 * <Header userCount={1250} />
 */
export const Header = memo(({ 
  userCount = 0, 
  onLogoClick 
}: HeaderProps) => (
  <header className="header" role="banner" aria-label="Application header">
    <div className="header-content">
      {/* Logo Section with enhanced accessibility */}
      <a 
        href="/" 
        className="logo"
        onClick={(e) => {
          if (onLogoClick) {
            e.preventDefault();
            onLogoClick();
          }
        }}
        aria-label="SegmentFlow homepage"
      >
        <div className="logo-icon" aria-hidden="true">
          <Target size={20} color="white" />
        </div>
        <div className="logo-text-container">
          <h1 className="logo-text">SegmentFlow</h1>
          <p className="logo-subtext">Product-Led Campaign Automation</p>
        </div>
      </a>
      
      {/* Dynamic User Count Display with screen reader support */}
      <div className="user-count" aria-live="polite">
        <span className="sr-only">Currently targeting</span>
        {userCount.toLocaleString()}
        <span className="sr-only">users</span>
        <span aria-hidden="true"> users targeted</span>
      </div>
    </div>
  </header>
));


