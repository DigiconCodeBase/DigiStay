import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage, setTheme, setFontSize, setNotifications, resetSettings } from '../../redux/settingsSlice';
import { useTranslation } from '../../hooks/useTranslation';
import './SettingsModal.css';

export default function SettingsModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const t = useTranslation();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
  };

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme));
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  };

  const handleFontSizeChange = (size) => {
    dispatch(setFontSize(size));
    // Apply font size to document
    document.documentElement.setAttribute('data-font-size', size);
  };

  const handleNotificationsToggle = () => {
    dispatch(setNotifications(!settings.notifications));
  };

  const handleResetSettings = () => {
    dispatch(resetSettings());
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-font-size');
    setShowResetConfirm(false);
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="settings-header">
          <h2>⚙️ {t('settings')}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Content */}
        <div className="settings-content">
          {/* Language Section */}
          <div className="settings-section">
            <label className="section-title">🌍 {t('language')}</label>
            <div className="options-group">
              {[
                { value: 'en', label: '🇬🇧 English' },
                { value: 'hn', label: 'HN हिंदी' },
              ].map((lang) => (
                <button
                  key={lang.value}
                  className={`option-btn ${settings.language === lang.value ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(lang.value)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Section */}
          <div className="settings-section">
            <label className="section-title">🎨 {t('theme')}</label>
            <div className="options-group">
              {[
                { value: 'light', label: `☀️ ${t('light')}` },
                { value: 'dark', label: `🌙 ${t('dark')}` },
                { value: 'auto', label: `🔄 ${t('auto')}` },
              ].map((theme) => (
                <button
                  key={theme.value}
                  className={`option-btn ${settings.theme === theme.value ? 'active' : ''}`}
                  onClick={() => handleThemeChange(theme.value)}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Section */}
          <div className="settings-section">
            <label className="section-title">📝 {t('fontSize')}</label>
            <div className="options-group">
              {[
                { value: 'small', label: t('small'), preview: '12px' },
                { value: 'normal', label: t('normal'), preview: '14px' },
                { value: 'large', label: t('large'), preview: '16px' },
              ].map((size) => (
                <button
                  key={size.value}
                  className={`option-btn ${settings.fontSize === size.value ? 'active' : ''}`}
                  onClick={() => handleFontSizeChange(size.value)}
                >
                  <span>{size.label}</span>
                  <span className="preview">({size.preview})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Section */}
          <div className="settings-section">
            <label className="section-title">🔔 {t('notifications')}</label>
            <div className="toggle-group">
              <button
                className={`toggle-btn ${settings.notifications ? 'active' : ''}`}
                onClick={handleNotificationsToggle}
              >
                <span className="toggle-indicator"></span>
                <span>{settings.notifications ? t('enabled') : t('disabled')}</span>
              </button>
            </div>
          </div>

          {/* Reset Section */}
          <div className="settings-section">
            <label className="section-title">🔄 {t('reset')}</label>
            {!showResetConfirm ? (
              <button
                className="reset-btn"
                onClick={() => setShowResetConfirm(true)}
              >
                {t('resetToDefault')}
              </button>
            ) : (
              <div className="reset-confirm">
                <p>{t('areYouSureReset')}</p>
                <div className="confirm-buttons">
                  <button
                    className="confirm-yes"
                    onClick={handleResetSettings}
                  >
                    {t('yesReset')}
                  </button>
                  <button
                    className="confirm-no"
                    onClick={() => setShowResetConfirm(false)}
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <p>{t('settingsSavedAutomatically')}</p>
          <button className="done-btn" onClick={onClose}>{t('done')}</button>
        </div>
      </div>
    </div>
  );
}
