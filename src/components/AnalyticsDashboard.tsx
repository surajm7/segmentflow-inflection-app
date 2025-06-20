import { Users, TrendingUp, MousePointer, MailOpen } from 'lucide-react';

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';


import { userSegmentData, campaignPerformanceData } from '../constants';

// Functional component for Analytics Dashboard
export const AnalyticsDashboard = () => (
  <div className="analytics-container">

    {/* Metrics Section */}
    <div className="metrics-container">

      {/* Total Users Metric Card */}
      <div className="metric-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div className="metric-icon metric-icon-blue">
            <Users size={20} color="#2563eb" />
          </div>
          <div>
            <div className="metric-value">8</div>
            <div className="metric-label">Total Users</div>
          </div>
        </div>
      </div>

      {/* Active Campaigns Metric Card */}
      <div className="metric-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div className="metric-icon metric-icon-green">
            <TrendingUp size={20} color="#16a34a" />
          </div>
          <div>
            <div className="metric-value">0</div>
            <div className="metric-label">Active Campaigns</div>
          </div>
        </div>
      </div>

      {/* Average Click Rate Metric Card */}
      <div className="metric-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div className="metric-icon metric-icon-purple">
            <MousePointer size={20} color="#7e22ce" />
          </div>
          <div>
            <div className="metric-value">23.4%</div>
            <div className="metric-label">Avg. Click Rate</div>
          </div>
        </div>
      </div>

      {/* Average Open Rate Metric Card */}
      <div className="metric-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div className="metric-icon metric-icon-orange">
            <MailOpen size={20} color="#ea580c" />
          </div>
          <div>
            <div className="metric-value">35.2%</div>
            <div className="metric-label">Avg. Open Rate</div>
          </div>
        </div>
      </div>
    </div>

    {/* Charts Section */}
    <div className="chart-container">

      {/* Line Chart for User Segment Growth */}
      <div className="chart-card">
        <h3 className="chart-title">User Segment Growth Over Time</h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userSegmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#2563eb"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Users in Segment"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart for Campaign Performance */}
      <div className="chart-card">
        <h3 className="chart-title">Campaign Performance</h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="opens"
                fill="#16a34a"
                name="Open Rate (%)"
              />
              <Bar
                dataKey="clicks"
                fill="#7e22ce"
                name="Click Rate (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);
