import { useState } from 'react';
import './RoomTypeManagement.css';

export default function RoomTypeManagement({ hotel }) {
  const defaultRoomTypes = [
    { id: 1, name: 'Standard Room', capacity: 2, pricePerNight: 7900, description: 'Comfortable room with queen bed' },
    { id: 2, name: 'Deluxe Room', capacity: 3, pricePerNight: 11900, description: 'Spacious room with premium amenities' },
    { id: 3, name: 'Suite', capacity: 4, pricePerNight: 19900, description: 'Luxury suite with separate living area' },
    { id: 4, name: 'Family Room', capacity: 5, pricePerNight: 15900, description: 'Spacious room perfect for families' },
  ];
  
  const [roomTypes, setRoomTypes] = useState(hotel?.roomTypes || defaultRoomTypes);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    capacity: 2,
    pricePerNight: 0,
    description: '',
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'pricePerNight' ? parseInt(value) : value
    }));
  };

  const handleAddRoomType = () => {
    if (formData.name && formData.pricePerNight > 0) {
      if (editingId) {
        setRoomTypes(roomTypes.map(room => 
          room.id === editingId ? { ...room, ...formData } : room
        ));
        setEditingId(null);
      } else {
        setRoomTypes([...roomTypes, { id: Date.now(), ...formData }]);
      }
      setFormData({ name: '', capacity: 2, pricePerNight: 0, description: '' });
      setShowForm(false);
      alert(editingId ? 'Room type updated!' : 'Room type added successfully!');
    }
  };

  const handleEdit = (room) => {
    setFormData(room);
    setEditingId(room.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this room type?')) {
      setRoomTypes(roomTypes.filter(room => room.id !== id));
      alert('Room type deleted!');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', capacity: 2, pricePerNight: 0, description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="room-type-management">
      <div className="section-header">
        <h2>Room Types Management</h2>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          ➕ Add New Room Type
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingId ? 'Edit Room Type' : 'Add New Room Type'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Room Type Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Deluxe Suite"
              />
            </div>

            <div className="form-group">
              <label>Capacity (Guests) *</label>
              <input
                type="number"
                name="capacity"
                min="1"
                max="10"
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price Per Night (₹) *</label>
              <input
                type="number"
                name="pricePerNight"
                min="0"
                step="100"
                value={formData.pricePerNight}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the room features..."
                rows="3"
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-save" onClick={handleAddRoomType}>
              ✓ {editingId ? 'Update' : 'Add'} Room Type
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              ✕ Cancel
            </button>
          </div>
        </div>
      )}

      <div className="room-types-list">
        {roomTypes.map(room => (
          <div key={room.id} className="room-type-card">
            <div className="room-type-info">
              <h4>{room.name}</h4>
              <p className="room-capacity">👥 Capacity: {room.capacity} guest{room.capacity > 1 ? 's' : ''}</p>
              <p className="room-price">💰 ₹{room.pricePerNight.toLocaleString('en-IN')} per night</p>
              <p className="room-description">{room.description}</p>
            </div>
            <div className="room-type-actions">
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

      {roomTypes.length === 0 && !showForm && (
        <div className="empty-state">
          <p>No room types created yet. Add your first room type!</p>
        </div>
      )}
    </div>
  );
}
