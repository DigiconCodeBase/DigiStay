import { useState } from 'react';
import { BOOKINGS_DATA } from '../../mockData/dummyData';
import './TodayBookingsList.css';

export default function TodayBookingsList({ date }) {
  const [bookingStatuses, setBookingStatuses] = useState({});

  // Get bookings for the specific date
  const todayBookings = BOOKINGS_DATA[date] || [];

  const handleBookingAction = (bookingId, action) => {
    setBookingStatuses(prev => ({
      ...prev,
      [bookingId]: action
    }));
  };

  const getBookingStatus = (booking) => {
    return bookingStatuses[booking.id] || booking.status;
  };

  const getBookingStats = () => {
    const total = todayBookings.length;
    const checkedIn = todayBookings.filter(b => getBookingStatus(b) === 'checked-in').length;
    const pending = todayBookings.filter(b => getBookingStatus(b) === 'pending').length;
    return { total, checkedIn, pending };
  };

  const stats = getBookingStats();

  return (
    <div className="today-bookings-list">
      <h2>Today's Bookings</h2>
      
      {/* Booking Stats for this date */}
      {todayBookings.length > 0 && (
        <div className="booking-stats">
          <div className="stat-badge">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-badge checked-in">
            <span className="stat-label">Checked In:</span>
            <span className="stat-value">{stats.checkedIn}</span>
          </div>
          <div className="stat-badge pending">
            <span className="stat-label">Pending:</span>
            <span className="stat-value">{stats.pending}</span>
          </div>
        </div>
      )}

      {todayBookings.length === 0 ? (
        <div className="no-bookings">
          <p>No bookings for this date</p>
        </div>
      ) : (
        <>
          <button className="check-in-all-btn">Check In All</button>

          {todayBookings.map((booking) => (
            <div key={booking.id} className={`booking-card ${getBookingStatus(booking)}`}>
              {/* Booking Header */}
              <div className="booking-header">
                <div className="booking-title">
                  <h3>{booking.name}</h3>
                  <span className={`booking-status ${getBookingStatus(booking)}`}>
                    {getBookingStatus(booking) === 'checked-in' ? '✓ Checked In' : '⏳ Pending'}
                  </span>
                </div>
              </div>

              {/* Booking Details */}
              <div className="booking-details">
                <div className="detail-row">
                  <span className="detail-icon">👤</span>
                  <span className="detail-text">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-icon">🛏️</span>
                  <span className="detail-text">Room {booking.room}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-icon">🕐</span>
                  <span className="detail-text">{booking.checkInTime} - {booking.checkOutTime}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-icon">📱</span>
                  <span className="detail-text">{booking.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-icon">✉️</span>
                  <span className="detail-text">{booking.email}</span>
                </div>
              </div>

              {/* Booking Actions */}
              <div className="booking-actions">
                {getBookingStatus(booking) === 'pending' && (
                  <button 
                    className="check-in-booking-btn"
                    onClick={() => handleBookingAction(booking.id, 'checked-in')}
                  >
                    Check In
                  </button>
                )}
                {getBookingStatus(booking) === 'checked-in' && (
                  <button 
                    className="check-out-booking-btn"
                    onClick={() => handleBookingAction(booking.id, 'pending')}
                  >
                    Check Out
                  </button>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
