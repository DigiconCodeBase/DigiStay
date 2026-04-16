import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './BookingForm.css';

export default function BookingForm({ onSubmit, onBack }) {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    // Indian phone number: 10 digits or +91 followed by 10 digits
    if (formData.phone.trim() && !/^(\+91|0)?[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Indian phone number (10 digits)';
    }
    if (!formData.checkInDate) newErrors.checkInDate = 'Check-in date is required';
    if (!formData.checkOutDate) newErrors.checkOutDate = 'Check-out date is required';
    if (formData.checkOutDate <= formData.checkInDate) {
      newErrors.checkOutDate = 'Check-out must be after check-in';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      {onBack && (
        <button 
          type="button"
          className="back-btn"
          onClick={onBack}
          title="Go back to dashboard"
        >
          ✕
        </button>
      )}
      <h2>{t('guestInformation')}</h2>

      <div className="form-section">
        <h3>{t('personalDetails')}</h3>
        
        <div className="form-group">
          <label htmlFor="firstName">{t('firstName')} *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder={t('firstName')}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">{t('lastName')} *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder={t('lastName')}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">{t('emailAddress')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('emailAddress')}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">{t('phoneNumber')} *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('phoneNumber')}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-section">
        <h3>{t('stayDetails')}</h3>

        <div className="form-group">
          <label htmlFor="checkInDate">{t('checkInDate')} *</label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            min={today}
            className={errors.checkInDate ? 'error' : ''}
          />
          {errors.checkInDate && <span className="error-message">{errors.checkInDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="checkOutDate">{t('checkOutDate')} *</label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            min={formData.checkInDate || today}
            className={errors.checkOutDate ? 'error' : ''}
          />
          {errors.checkOutDate && <span className="error-message">{errors.checkOutDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="guests">{t('numberOfGuests')} *</label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
          >
            <option value="1">1 {t('guest')}</option>
            <option value="2">2 {t('guests')}</option>
            <option value="3">3 {t('guests')}</option>
            <option value="4">4 {t('guests')}</option>
            <option value="5">5+ {t('guests')}</option>
          </select>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        {t('continueToRoomSelection')}
      </button>
    </form>
  );
}
