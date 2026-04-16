import { useState } from 'react';
import './MyHotels.css';

export default function MyHotels({ onSelectHotel, selectedHotelId }) {
  const [hotels, setHotels] = useState([
    { id: 1, name: 'DigiStay Downtown', city: 'New York', rooms: 12, email: 'downtown@digistay.com' },
    { id: 2, name: 'DigiStay Beachfront', city: 'Miami', rooms: 18, email: 'beach@digistay.com' },
    { id: 3, name: 'DigiStay Mountain Resort', city: 'Denver', rooms: 25, email: 'mountain@digistay.com' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddHotel = () => {
    if (formData.name && formData.city && formData.email) {
      if (editingId) {
        setHotels(hotels.map(hotel =>
          hotel.id === editingId ? { ...hotel, ...formData } : hotel
        ));
        setEditingId(null);
      } else {
        setHotels([...hotels, { id: Date.now(), ...formData, rooms: 0 }]);
      }
      setFormData({ name: '', city: '', email: '' });
      setShowForm(false);
      alert(editingId ? 'Hotel updated!' : 'Hotel added!');
    }
  };

  const handleEdit = (hotel) => {
    setFormData({ name: hotel.name, city: hotel.city, email: hotel.email });
    setEditingId(hotel.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this hotel?')) {
      setHotels(hotels.filter(hotel => hotel.id !== id));
      if (selectedHotelId === id) {
        onSelectHotel(null);
      }
      alert('Hotel deleted!');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', city: '', email: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="my-hotels">
      <div className="hotels-header">
        <h2>My Hotels</h2>
        <button className="btn-add-hotel" onClick={() => setShowForm(true)}>
          ➕ Add New Hotel
        </button>
      </div>

      {showForm && (
        <div className="hotel-form-container">
          <h3>{editingId ? 'Edit Hotel' : 'Add New Hotel'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Hotel Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., DigiStay Downtown"
              />
            </div>

            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., New York"
              />
            </div>

            <div className="form-group full-width">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hotel@example.com"
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-save" onClick={handleAddHotel}>
              ✓ {editingId ? 'Update' : 'Add'} Hotel
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              ✕ Cancel
            </button>
          </div>
        </div>
      )}

      <div className="hotels-grid">
        {hotels.map(hotel => (
          <div key={hotel.id} className={`hotel-card ${selectedHotelId === hotel.id ? 'selected' : ''}`}>
            <div className="hotel-status">
              {selectedHotelId === hotel.id && <span className="active-badge">Active</span>}
            </div>

            <div className="hotel-content">
              <h3>{hotel.name}</h3>
              <div className="hotel-info">
                <div className="info-item">
                  <span className="info-label">📍 City:</span>
                  <span className="info-value">{hotel.city}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📧 Email:</span>
                  <span className="info-value">{hotel.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">🛏️ Rooms:</span>
                  <span className="info-value">{hotel.rooms}</span>
                </div>
              </div>
            </div>

            <div className="hotel-actions">
              <button 
                className="btn-select" 
                onClick={() => onSelectHotel(hotel.id)}
                disabled={selectedHotelId === hotel.id}
              >
                {selectedHotelId === hotel.id ? '✓ Selected' : 'Select'}
              </button>
              <button className="btn-manage" onClick={() => handleEdit(hotel)}>
                ✏️ Edit
              </button>
              <button className="btn-delete" onClick={() => handleDelete(hotel.id)}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {hotels.length === 0 && !showForm && (
        <div className="empty-state">
          <p>No hotels yet. Create your first hotel to get started!</p>
        </div>
      )}
    </div>
  );
}
