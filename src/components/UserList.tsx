import { Users } from 'lucide-react';
import type { User } from '../types/types';

// Props interface for the UserList component
interface UserListProps {
  users: User[]; // Array of user objects to display
}

// Functional component to render a list of users
export const UserList = ({ users }: UserListProps) => (
  <div className="card">
    {/* Header with icon and title */}
    <div className="user-list-header">
      <Users size={20} color="#2563eb" />
      <h3 className="card-title">
        Matching Users ({users.length})
      </h3>
    </div>

    {/* Container for user entries */}
    <div className="user-list-container">
      {users.length > 0 ? (
        // Render each user in the list
        users.map(user => (
          <div key={user.id} className="user-item">
            {/* User info section with avatar and text */}
            <div className="user-info">
              {/* Avatar showing first character of user's name */}
              <div className="user-avatar">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="user-name">{user.name}</div>
                <div className="user-company">{user.company}</div>
              </div>
            </div>

            {/* User plan badge with conditional styling */}
            <div className="plan-badge-container">
              <span className={`plan-badge ${
                user.plan === 'Enterprise' ? 'plan-enterprise' :
                user.plan === 'Premium' ? 'plan-premium' : 'plan-free'
              }`}>
                {user.plan}
              </span>
            </div>
          </div>
        ))
      ) : (
        // Fallback message when no users match the criteria
        <div className="user-list-empty">
          No matching users found
        </div>
      )}
    </div>
  </div>
);
