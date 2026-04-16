import { useState } from 'react';
import { useSelector } from 'react-redux';
import TodayBookingsList from './TodayBookingsList';
import DatePicker from '../common/DatePicker';
import SettingsModal from '../settings/SettingsModal';
import { formatDateBooking } from '../../utils/utility';
import { ROOMS_DATA, CURRENT_DATE } from '../../mockData/dummyData';
import { UserRole } from '../common/enums';
import './ReceptionDashboard.css';

export default function ReceptionDashboard({ onNewBooking, onSwitchToOwner, onLogout }) {
  const userRole = useSelector((state) => state.auth.userRole);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All Rooms');
  const [showSettings, setShowSettings] = useState(false);
  
  // Get today's date
  const today = new Date();
  const todayFormatted = formatDateBooking(today);
  
  // State for selected date
  const [selectedDate, setSelectedDate] = useState(todayFormatted);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // Calculate stats
  const totalRooms = ROOMS_DATA.length;
  const occupiedRooms = ROOMS_DATA.filter(r => r.status === 'occupied').length;
  const availableRooms = ROOMS_DATA.filter(r => r.status === 'available').length;
  const todayCheckOut = formatDateBooking(CURRENT_DATE);
  const checkingOutToday = ROOMS_DATA.filter(
    r => r.status === 'occupied' && r.checkOut === todayCheckOut
  ).length;

  // Filter rooms based on search and filter
  const filteredRooms = ROOMS_DATA.filter(room => {
    const matchesSearch =
      room.id.toString().includes(searchQuery) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.guest && room.guest.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  return (
    <div className="reception-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🏨 DigiStay Reception Dashboard</h1>
          <DatePicker 
            value={selectedDate}
            onChange={handleDateChange}
            label="Select Date"
            placeholder="Pick a date..."
          />
        </div>
        <div className="header-right">
          {userRole === UserRole.OWNER && onSwitchToOwner && (
            <button className="owner-mode-btn" onClick={onSwitchToOwner}>
              ⚙️ Owner Mode
            </button>
          )}
          <button 
            className="settings-btn" 
            onClick={() => setShowSettings(true)}
            title="Settings"
          >
            ⚙️
          </button>
          <button className="new-booking-btn" onClick={onNewBooking}>
            + New Booking
          </button>
          {onLogout && (
            <button className="logout-btn" onClick={onLogout} title="Logout">
              🔓
            </button>
          )}
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Rooms</p>
            <h2>{totalRooms}</h2>
          </div>
          <div className="stat-icon">🏠</div>
        </div>

        <div className="stat-card occupied">
          <div className="stat-content">
            <p className="stat-label">Occupied</p>
            <h2>{occupiedRooms} ({Math.round((occupiedRooms / totalRooms) * 100)}%)</h2>
          </div>
          <div className="stat-icon">👥</div>
        </div>

        <div className="stat-card available">
          <div className="stat-content">
            <p className="stat-label">Available</p>
            <h2>{availableRooms}</h2>
          </div>
          <div className="stat-icon">🛏️</div>
        </div>

        <div className="stat-card checkout">
          <div className="stat-content">
            <p className="stat-label">Checking Out Today</p>
            <h2>{checkingOutToday}</h2>
          </div>
          <div className="stat-icon">🚪</div>
        </div>
      </div>

      {/* Tabs and Controls */}
      <div className="controls-section">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Rooms Overview
          </button>
          <button
            className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Today's Bookings
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search by room number, type, or guest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
              <option>All Rooms</option>
              <option>Available</option>
              <option>Occupied</option>
              <option>Cleaning</option>
              <option>Maintenance</option>
            </select>
          </div>
        )}
      </div>

      {/* Rooms Overview Grid */}
      {activeTab === 'overview' && (
        <div className="rooms-grid">
          {filteredRooms.map((room) => (
            <div key={room.id} className={`room-card ${room.status}`}>
              {/* Room Header */}
              <div className="room-card-header">
                <div className="room-number">{room.id}</div>
                <div className={`status-dot ${room.status}`}></div>
              </div>

              {/* Room Info */}
              <div className="room-card-body">
                <p className="room-type">{room.type}</p>

                {/* Status Badge */}
                <div className={`status-badge ${room.status}`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </div>

                {/* Guest Info */}
                {room.guest && (
                  <div className="guest-info">
                    <p className="guest-name">👤 {room.guest}</p>
                    <p className="checkout-date">Check-out: {room.checkOut}</p>
                  </div>
                )}
              </div>

              {/* Room Action */}
              <div className="room-card-footer">
                {room.status === 'available' && (
                  <button className="check-in-btn">Check In</button>
                )}
                <button className="room-details-btn">•••</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Today's Bookings List */}
      {activeTab === 'bookings' && (
        <TodayBookingsList date={selectedDate} />
      )}

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
