import { useState } from 'react';
import './AmenitiesManagement.css';

export default function AmenitiesManagement({ hotel }) {
  const defaultAmenities = [
    { id: 1, name: 'WiFi', icon: '📡', category: 'Technology' },
    { id: 2, name: 'TV', icon: '📺', category: 'Entertainment' },
    { id: 3, name: 'Air Conditioning', icon: '❄️', category: 'Climate' },
    { id: 4, name: 'Bathroom', icon: '🚿', category: 'Facilities' },
    { id: 5, name: 'Mini Bar', icon: '🍹', category: 'Service' },
    { id: 6, name: 'Swimming Pool', icon: '🏊', category: 'Recreation' },
  ];
  
  const [amenities, setAmenities] = useState(hotel?.amenities || defaultAmenities);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    icon: '✨',
    category: 'Other',
  });

  const [editingId, setEditingId] = useState(null);

  const categories = ['Technology', 'Entertainment', 'Climate', 'Facilities', 'Service', 'Recreation', 'Other'];
  const commonIcons = ['📡', '📺', '❄️', '🚿', '🍹', '🏊', '✨', '🛏️', '📱', '💻', '🔐', '🌿'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAmenity = () => {
    if (formData.name) {
      if (editingId) {
        setAmenities(amenities.map(amenity => 
          amenity.id === editingId ? { ...amenity, ...formData } : amenity
        ));
        setEditingId(null);
      } else {
        setAmenities([...amenities, { id: Date.now(), ...formData }]);
      }
      setFormData({ name: '', icon: '✨', category: 'Other' });
      setShowForm(false);
      alert(editingId ? 'Amenity updated!' : 'Amenity added successfully!');
    }
  };

  const handleEdit = (amenity) => {
    setFormData(amenity);
    setEditingId(amenity.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this amenity?')) {
      setAmenities(amenities.filter(amenity => amenity.id !== id));
      alert('Amenity deleted!');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', icon: '✨', category: 'Other' });
    setEditingId(null);
    setShowForm(false);
  };

  const groupedAmenities = categories.reduce((acc, category) => {
    acc[category] = amenities.filter(a => a.category === category);
    return acc;
  }, {});

  return (
    <div className="amenities-management">
      <div className="section-header">
        <h2>Amenities Management</h2>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          ➕ Add New Amenity
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingId ? 'Edit Amenity' : 'Add New Amenity'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Amenity Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Swimming Pool"
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Icon</label>
              <div className="icon-selector">
                {commonIcons.map(icon => (
                  <button
                    key={icon}
                    className={`icon-btn ${formData.icon === icon ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-save" onClick={handleAddAmenity}>
              ✓ {editingId ? 'Update' : 'Add'} Amenity
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              ✕ Cancel
            </button>
          </div>
        </div>
      )}

      {Object.entries(groupedAmenities).map(([category, categoryAmenities]) => (
        categoryAmenities.length > 0 && (
          <div key={category} className="amenities-category">
            <h3>{category}</h3>
            <div className="amenities-grid">
              {categoryAmenities.map(amenity => (
                <div key={amenity.id} className="amenity-card">
                  <div className="amenity-icon">{amenity.icon}</div>
                  <div className="amenity-name">{amenity.name}</div>
                  <div className="amenity-actions">
                    <button className="btn-edit" onClick={() => handleEdit(amenity)}>
                      ✏️
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(amenity.id)}>
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {amenities.length === 0 && !showForm && (
        <div className="empty-state">
          <p>No amenities created yet. Add your first amenity!</p>
        </div>
      )}
    </div>
  );
}
