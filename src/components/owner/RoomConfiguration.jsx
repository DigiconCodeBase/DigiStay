import { useState } from 'react';
import './RoomConfiguration.css';

export default function RoomConfiguration({ hotel }) {
  const defaultRooms = [
    { id: 1, roomNumber: 101, floor: 1, roomType: 'Standard Room', capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Bathroom'] },
    { id: 2, roomNumber: 102, floor: 1, roomType: 'Standard Room', capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Bathroom'] },
    { id: 3, roomNumber: 103, floor: 1, roomType: 'Deluxe Room', capacity: 3, amenities: ['WiFi', 'Smart TV', 'AC', 'Bathroom', 'Mini Bar'] },
    { id: 4, roomNumber: 201, floor: 2, roomType: 'Deluxe Room', capacity: 3, amenities: ['WiFi', 'Smart TV', 'AC', 'Bathroom', 'Mini Bar'] },
    { id: 5, roomNumber: 202, floor: 2, roomType: 'Suite', capacity: 4, amenities: ['WiFi', '4K TV', 'AC', 'Jacuzzi', 'Mini Bar', 'Bathrobe'] },
  ];
  
  const [rooms, setRooms] = useState(hotel?.roomsData || defaultRooms);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    floor: 1,
    roomType: 'Standard Room',
    capacity: 2,
    amenities: [],
  });

  const roomTypes = ['Standard Room', 'Deluxe Room', 'Suite', 'Family Room', 'Executive Suite'];
  const availableAmenities = ['WiFi', 'TV', 'Smart TV', '4K TV', 'AC', 'Bathroom', 'Mini Bar', 'Jacuzzi', 'Bathrobe', 'Kitchen', 'Living Area', 'Balcony'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'floor' || name === 'capacity' ? parseInt(value) : value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleAddRoom = () => {
    if (formData.roomNumber && formData.roomType) {
      if (editingId) {
        setRooms(rooms.map(room =>
          room.id === editingId ? { ...room, ...formData } : room
        ));
        setEditingId(null);
      } else {
        setRooms([...rooms, { id: Date.now(), ...formData }]);
      }
      setFormData({ roomNumber: '', floor: 1, roomType: 'Standard Room', capacity: 2, amenities: [] });
      setShowForm(false);
      alert(editingId ? 'Room updated!' : 'Room added successfully!');
    }
  };

  const handleEdit = (room) => {
    setFormData(room);
    setEditingId(room.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter(room => room.id !== id));
      alert('Room deleted!');
    }
  };

  const handleCancel = () => {
    setFormData({ roomNumber: '', floor: 1, roomType: 'Standard Room', capacity: 2, amenities: [] });
    setEditingId(null);
    setShowForm(false);
  };

  const groupedRooms = rooms.reduce((acc, room) => {
    if (!acc[room.floor]) {
      acc[room.floor] = [];
    }
    acc[room.floor].push(room);
    return acc;
  }, {});

  const sortedFloors = Object.keys(groupedRooms).map(Number).sort((a, b) => a - b);

  return (
    <div className="room-configuration">
      <div className="section-header">
        <h2>Room Configuration</h2>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          ➕ Add New Room
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingId ? 'Edit Room' : 'Add New Room'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Room Number *</label>
              <input
                type="number"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="e.g., 101"
              />
            </div>

            <div className="form-group">
              <label>Floor *</label>
              <input
                type="number"
                name="floor"
                min="1"
                max="10"
                value={formData.floor}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Room Type *</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
              >
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Guest Capacity *</label>
              <input
                type="number"
                name="capacity"
                min="1"
                max="10"
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Available Amenities</label>
              <div className="amenities-checkboxes">
                {availableAmenities.map(amenity => (
                  <label key={amenity} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-save" onClick={handleAddRoom}>
              ✓ {editingId ? 'Update' : 'Add'} Room
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              ✕ Cancel
            </button>
          </div>
        </div>
      )}

      {sortedFloors.map(floor => (
        <div key={floor} className="floor-section">
          <h3>Floor {floor}</h3>
          <div className="rooms-grid">
            {groupedRooms[floor].map(room => (
              <div key={room.id} className="room-config-card">
                <div className="room-header">
                  <div className="room-number-badge">Room {room.roomNumber}</div>
                  <div className="room-type-badge">{room.roomType}</div>
                </div>

                <div className="room-details">
                  <div className="detail-item">
                    <span className="detail-label">Floor:</span>
                    <span className="detail-value">{room.floor}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Capacity:</span>
                    <span className="detail-value">👥 {room.capacity} guest{room.capacity > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <div className="amenities-section">
                  <label className="amenities-label">Amenities:</label>
                  <div className="amenities-tags">
                    {room.amenities.map(amenity => (
                      <span key={amenity} className="amenity-tag">
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="room-actions">
                  <button className="btn-edit" onClick={() => handleEdit(room)}>
                    ✏️ Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(room.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {rooms.length === 0 && !showForm && (
        <div className="empty-state">
          <p>No rooms configured yet. Add your first room!</p>
        </div>
      )}
    </div>
  );
}
