import { useState } from 'react';
import { ROOM_AVAILABILITY_DATA } from '../../mockData/dummyData';
import './RoomAvailability.css';

export default function RoomAvailability({ hotel }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [rooms, setRooms] = useState(ROOM_AVAILABILITY_DATA[hotel?.id] || []);

  const handleStatusChange = (id, newStatus) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, status: newStatus } : room
    ));
    alert('Room status updated!');
  };

  const stats = {
    total: rooms.length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    available: rooms.filter(r => r.status === 'available').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
    cleaning: rooms.filter(r => r.status === 'cleaning').length,
  };

  const occupancyRate = ((stats.occupied / stats.total) * 100).toFixed(1);

  return (
    <div className="room-availability">
      <div className="section-header">
        <h2>Room Availability Management</h2>
        <div className="date-selector">
          <label>Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-item">
          <span className="stat-label">Total Rooms</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-item occupied">
          <span className="stat-label">Occupied</span>
          <span className="stat-value">{stats.occupied}</span>
        </div>
        <div className="stat-item available">
          <span className="stat-label">Available</span>
          <span className="stat-value">{stats.available}</span>
        </div>
        <div className="stat-item cleaning">
          <span className="stat-label">Cleaning</span>
          <span className="stat-value">{stats.cleaning}</span>
        </div>
        <div className="stat-item maintenance">
          <span className="stat-label">Maintenance</span>
          <span className="stat-value">{stats.maintenance}</span>
        </div>
        <div className="stat-item occupancy">
          <span className="stat-label">Occupancy Rate</span>
          <span className="stat-value">{occupancyRate}%</span>
        </div>
      </div>

      <div className="rooms-management">
        <h3>Room Status</h3>
        <div className="rooms-table">
          <div className="table-header">
            <div className="col-room-id">Room ID</div>
            <div className="col-type">Room Type</div>
            <div className="col-status">Status</div>
            <div className="col-guest">Guest Name</div>
            <div className="col-checkout">Check-Out</div>
            <div className="col-action">Action</div>
          </div>

          {rooms.map(room => (
            <div key={room.id} className="table-row">
              <div className="col-room-id">{room.id}</div>
              <div className="col-type">{room.type}</div>
              <div className="col-status">
                <span className={`status-badge ${room.status}`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
              </div>
              <div className="col-guest">{room.guest || "-"}</div>
              <div className="col-checkout">{room.checkOut || "-"}</div>
              <div className="col-action">
                <select
                  value={room.status}
                  onChange={(e) => handleStatusChange(room.id, e.target.value)}
                  className="status-select"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="legend">
        <h3>Status Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color available"></span>
            <span>Available - Room is ready for guests</span>
          </div>
          <div className="legend-item">
            <span className="legend-color occupied"></span>
            <span>Occupied - Guest is currently in the room</span>
          </div>
          <div className="legend-item">
            <span className="legend-color cleaning"></span>
            <span>Cleaning - Room is being cleaned</span>
          </div>
          <div className="legend-item">
            <span className="legend-color maintenance"></span>
            <span>Maintenance - Room requires repairs/maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
