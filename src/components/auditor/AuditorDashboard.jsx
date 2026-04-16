import { useTranslation } from '../../hooks/useTranslation';
import { AVAILABLE_HOTELS } from '../../mockData/dummyData';
import './AuditorDashboard.css';

export default function AuditorDashboard({ onSelectHotel, auditorName }) {
  const t = useTranslation();

  const today = new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="auditor-dashboard">
      <div className="auditor-header">
        <div className="auditor-info">
          <h1>✅ {t('auditorDashboard')}</h1>
          <div className="auditor-details">
            <span className="auditor-name">👤 {auditorName || 'Auditor'}</span>
            <span className="auditor-date">📅 {today}</span>
          </div>
        </div>
      </div>

      <div className="hotel-selection-container">
        <h2>{t('selectHotel')}</h2>
        
        <div className="hotels-list">
          {AVAILABLE_HOTELS?.map((hotel) => (
            <button
              key={hotel.id}
              className="hotel-card"
              onClick={() => onSelectHotel(hotel)}
            >
              <div className="hotel-content">
                <div className="hotel-name">
                  🏨 {hotel.name}
                </div>
                <div className="hotel-rooms">
                  {hotel.totalRooms} {t('rooms')}
                </div>
              </div>
              <div className="hotel-arrow">→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
