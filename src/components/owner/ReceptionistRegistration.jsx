import { useState } from 'react';
import { getInitialRececeptionistsData } from '../../mockData/dummyData';
import { generateStrongPassword, isValidEmail, isValidPhone, formatDateDisplay } from '../../utils/utility';
import './ReceptionistRegistration.css';

export default function ReceptionistRegistration({ hotel }) {
  const [activeSection, setActiveSection] = useState('add'); // 'add' or 'list'
  const [receptionists, setReceptionists] = useState(getInitialRececeptionistsData());

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showCredentials, setShowCredentials] = useState(null);

  const generatePassword = () => {
    const password = generateStrongPassword(12);
    setFormData(prev => ({
      ...prev,
      password: password,
      confirmPassword: password
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!isValidPhone(formData.phone)) newErrors.phone = 'Invalid phone number';
    
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (formData.username.length < 4) newErrors.username = 'Username must be at least 4 characters';
    else if (receptionists.some(r => r.username === formData.username && r.id !== editingId)) {
      newErrors.username = 'Username already exists';
    }
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddReceptionist = () => {
    if (!validateForm()) return;

    if (editingId) {
      setReceptionists(prev =>
        prev.map(rec =>
          rec.id === editingId
            ? {
                ...rec,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                username: formData.username,
                credentialsGenerated: true
              }
            : rec
        )
      );
      setSuccessMessage('Receptionist updated successfully!');
      setEditingId(null);
    } else {
      const newReceptionist = {
        id: Math.max(...receptionists.map(r => r.id), 0) + 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
        status: 'active',
        joinDate: new Date().toISOString(),
        credentialsGenerated: true
      };
      setReceptionists(prev => [...prev, newReceptionist]);
      setSuccessMessage('Receptionist registered successfully!');
    }

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEditReceptionist = (receptionist) => {
    setEditingId(receptionist.id);
    setFormData({
      firstName: receptionist.firstName,
      lastName: receptionist.lastName,
      email: receptionist.email,
      phone: receptionist.phone,
      username: receptionist.username,
      password: '',
      confirmPassword: '',
    });
    setActiveSection('add');
  };

  const handleDeleteReceptionist = (id) => {
    if (window.confirm('Are you sure you want to delete this receptionist?')) {
      setReceptionists(prev => prev.filter(rec => rec.id !== id));
      setSuccessMessage('Receptionist deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setEditingId(null);
  };

  return (
    <div className="receptionist-registration">
      <div className="registration-header">
        <h2>👥 Receptionist Management</h2>
        <p>Add and manage receptionist staff for {hotel?.name}</p>
      </div>

      {successMessage && (
        <div className="success-message">
          <span>✓ {successMessage}</span>
        </div>
      )}

      <div className="registration-tabs">
        <button
          className={`tab-btn ${activeSection === 'add' ? 'active' : ''}`}
          onClick={() => { setActiveSection('add'); handleCancel(); }}
        >
          ➕ Add Receptionist
        </button>
        <button
          className={`tab-btn ${activeSection === 'list' ? 'active' : ''}`}
          onClick={() => setActiveSection('list')}
        >
          📋 Receptionist List ({receptionists.length})
        </button>
      </div>

      {activeSection === 'add' && (
        <div className="registration-form-section">
          <div className="form-container">
            <h3>{editingId ? 'Edit Receptionist' : 'Register New Receptionist'}</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91-1234567890"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  className={errors.username ? 'error' : ''}
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label>Password *</label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className={errors.password ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>Confirm Password *</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="password-actions">
              <button className="generate-password-btn" onClick={generatePassword}>
                🔐 Generate Strong Password
              </button>
            </div>

            <div className="form-actions">
              <button
                className="submit-btn"
                onClick={handleAddReceptionist}
              >
                {editingId ? '✏️ Update Receptionist' : '➕ Add Receptionist'}
              </button>
              <button
                className="cancel-btn"
                onClick={handleCancel}
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'list' && (
        <div className="receptionists-list-section">
          {receptionists.length === 0 ? (
            <div className="empty-state">
              <p>No receptionists registered yet.</p>
              <button className="add-first-btn" onClick={() => setActiveSection('add')}>
                Add First Receptionist
              </button>
            </div>
          ) : (
            <div className="receptionists-table">
              <div className="table-header">
                <div className="col-name">Name</div>
                <div className="col-email">Email</div>
                <div className="col-phone">Phone</div>
                <div className="col-username">Username</div>
                <div className="col-status">Status</div>
                <div className="col-actions">Actions</div>
              </div>
              {receptionists.map(receptionist => (
                <div key={receptionist.id} className="table-row">
                  <div className="col-name">
                    <div className="receptionist-avatar">
                      {receptionist.firstName[0]}{receptionist.lastName[0]}
                    </div>
                    <div className="receptionist-name">
                      {receptionist.firstName} {receptionist.lastName}
                    </div>
                  </div>
                  <div className="col-email">{receptionist.email}</div>
                  <div className="col-phone">{receptionist.phone}</div>
                  <div className="col-username">@{receptionist.username}</div>
                  <div className="col-status">
                    <span className={`status-badge ${receptionist.status}`}>
                      {receptionist.status.charAt(0).toUpperCase() + receptionist.status.slice(1)}
                    </span>
                  </div>
                  <div className="col-actions">
                    <button
                      className="action-btn view-credentials"
                      onClick={() => setShowCredentials(showCredentials === receptionist.id ? null : receptionist.id)}
                      title="View Credentials"
                    >
                      🔑
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEditReceptionist(receptionist)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteReceptionist(receptionist.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                  {showCredentials === receptionist.id && (
                    <div className="credentials-panel">
                      <div className="credentials-content">
                        <h4>Login Credentials</h4>
                        <div className="credential-item">
                          <label>Username:</label>
                          <code>{receptionist.username}</code>
                          <button className="copy-btn" onClick={() => {
                            navigator.clipboard.writeText(receptionist.username);
                            alert('Username copied!');
                          }}>📋</button>
                        </div>
                        <div className="credential-item">
                          <label>Password:</label>
                          <code>••••••••</code>
                          <button className="copy-btn" onClick={() => alert('Password shown only during first registration')}>ℹ️</button>
                        </div>
                        <div className="credential-item">
                          <label>Join Date:</label>
                          <span>{formatDateDisplay(new Date(receptionist.joinDate))}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
