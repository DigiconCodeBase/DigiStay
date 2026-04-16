import './OwnerDashboard.css';

export default function OwnerDashboard({ hotel }) {
  const stats = [
    { label: 'Total Rooms', value: hotel?.rooms || '12', icon: '🛏️' },
    { label: 'Room Types', value: hotel?.roomTypes?.length || '4', icon: '📂' },
    { label: 'Amenities', value: hotel?.amenities?.length || '15', icon: '✨' },
    { label: 'Occupancy Rate', value: '75%', icon: '📊' },
  ];

  return (
    <div className="owner-dashboard">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <span className="action-icon">➕</span>
            <span>Add New Room</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">✏️</span>
            <span>Edit Hotel Info</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">⚙️</span>
            <span>Manage Amenities</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📅</span>
            <span>View Bookings</span>
          </button>
        </div>
      </div>

      <div className="dashboard-info">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-time">Today</span>
            <span className="activity-text">New booking confirmed for Room 101</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">Yesterday</span>
            <span className="activity-text">Guest checked out from Room 205</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">2 days ago</span>
            <span className="activity-text">Amenity "WiFi" added to all rooms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
