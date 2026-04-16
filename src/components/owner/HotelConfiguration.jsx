import { useState } from 'react';
import './HotelConfiguration.css';

export default function HotelConfiguration({ hotel }) {
  const initialData = {
    name: hotel?.name || 'DigiStay Hotels',
    email: hotel?.email || 'info@digistay.in',
    phone: hotel?.phone || '+91-9876543210',
    address: hotel?.address || 'Plot No. 123, Business Complex, city name, State, 400001',
    city: hotel?.city || 'Mumbai',
    state: hotel?.state || 'Maharashtra',
    country: 'India',
    zipCode: hotel?.zipCode || '400001',
    description: hotel?.description || 'A premium hotel with excellent amenities and hospitality',
    totalRooms: hotel?.rooms || 12,
    checkInTime: hotel?.checkInTime || '14:00',
    checkOutTime: hotel?.checkOutTime || '11:00',
  };

  const [hotelData, setHotelData] = useState(initialData);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(hotelData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setHotelData(formData);
    setIsEditing(false);
    alert('Hotel configuration saved successfully!');
  };

  const handleCancel = () => {
    setFormData(hotelData);
    setIsEditing(false);
  };

  return (
    <div className="hotel-configuration">
      <div className="config-header">
        <h2>Hotel Information</h2>
        <button 
          className={`edit-btn ${isEditing ? 'save' : ''}`}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? '✓ Save' : '✏️ Edit'}
        </button>
      </div>

      <div className="config-form">
        <div className="form-section-config">
          <h3>Basic Information</h3>
          
          <div className="form-group-config">
            <label>Hotel Name *</label>
            <input
              type="text"
              name="name"
              value={isEditing ? formData.name : hotelData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-row">
            <div className="form-group-config">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={isEditing ? formData.email : hotelData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group-config">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={isEditing ? formData.phone : hotelData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="form-group-config">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={isEditing ? formData.address : hotelData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-row">
            <div className="form-group-config">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={isEditing ? formData.city : hotelData.city}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group-config">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={isEditing ? formData.state : hotelData.state}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group-config">
              <label>Postal Code</label>
              <input
                type="text"
                name="zipCode"
                value={isEditing ? formData.zipCode : hotelData.zipCode}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group-config">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value="India"
                disabled={true}
              />
            </div>
          </div>

          <div className="form-group-config">
            <label>Description</label>
            <textarea
              name="description"
              value={isEditing ? formData.description : hotelData.description}
              onChange={handleChange}
              disabled={!isEditing}
              rows="4"
            />
          </div>
        </div>

        <div className="form-section-config">
          <h3>Operational Details</h3>

          <div className="form-row">
            <div className="form-group-config">
              <label>Total Rooms</label>
              <input
                type="number"
                name="totalRooms"
                value={isEditing ? formData.totalRooms : hotelData.totalRooms}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group-config">
              <label>Check-In Time</label>
              <input
                type="time"
                name="checkInTime"
                value={isEditing ? formData.checkInTime : hotelData.checkInTime}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group-config">
              <label>Check-Out Time</label>
              <input
                type="time"
                name="checkOutTime"
                value={isEditing ? formData.checkOutTime : hotelData.checkOutTime}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button className="btn-save" onClick={handleSave}>✓ Save Changes</button>
            <button className="btn-cancel" onClick={handleCancel}>✕ Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
