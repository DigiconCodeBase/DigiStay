import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserRole, AppConfig } from '../common/enums';
import { login } from '../../redux/authSlice';
import { useTranslation } from '../../hooks/useTranslation';
import './LoginScreen.css';

export default function LoginScreen() {
  const t = useTranslation();
  const dispatch = useDispatch();
  const [role, setRole] = useState(UserRole.RECEPTIONIST);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (password.trim() && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      dispatch(login({
        role,
        username,
        loginTime: new Date()
      }));
    }, 500);
  };

  const handleRoleChange = (value) => {
    setRole(value);
    setErrors({}); // Clear errors when role changes
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🏨</div>
          <h1>DigiStay Hotels</h1>
          <p className="login-subtitle">Management System</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {/* Role Selection */}
          <div className="role-selector">
            <label className="role-label">{t('selectRole')}</label>
            <div className="role-buttons">
              <button
                type="button"
                className={`role-button ${role === UserRole.RECEPTIONIST ? 'active' : ''}`}
                onClick={() => handleRoleChange(UserRole.RECEPTIONIST)}
              >
                👥 Receptionist
              </button>
              <button
                type="button"
                className={`role-button ${role === UserRole.OWNER ? 'active' : ''}`}
                onClick={() => handleRoleChange(UserRole.OWNER)}
              >
                👨‍💼 Owner
              </button>
              <button
                type="button"
                className={`role-button ${role === UserRole.AUDITOR ? 'active' : ''}`}
                onClick={() => handleRoleChange(UserRole.AUDITOR)}
              >
                ✅ Auditor
              </button>
            </div>
          </div>

          {/* Role Description */}
          <div className="role-description">
            {role === UserRole.RECEPTIONIST ? (
              <p>Check-in/Check-out management & Room availability</p>
            ) : role === UserRole.OWNER ? (
              <p>Hotel configuration & Staff management</p>
            ) : (
              <p>Room audit & Occupancy verification</p>
            )}
          </div>

          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">{t('username')}</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors({ ...errors, username: '' });
              }}
              placeholder={t('enterYourUsername')}
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              id="password"
              type="password"
              value="{password}"
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              placeholder={t('enterYourPassword')}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <p>Demo Credentials: {AppConfig.DEMO_USERNAME} / {AppConfig.DEMO_PASSWORD}</p>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2026 DigiStay Hotels. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
