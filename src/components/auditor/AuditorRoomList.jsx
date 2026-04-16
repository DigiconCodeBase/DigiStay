import { useTranslation } from '../../hooks/useTranslation';
import './AuditorRoomList.css';

export default function AuditorRoomList({ 
  hotel, 
  rooms, 
  onVerifyRoom, 
  onBack, 
  verifiedRooms 
}) {
  const t = useTranslation();

  const verificationProgress = verifiedRooms.length;
  const totalRooms = rooms.length;

  return (
    <div className="auditor-room-list">
      <div className="room-list-header">
        <button className="back-btn" onClick={onBack}>
          ← {hotel?.name}
        </button>
      </div>

      <div className="audit-progress">
        <div className="progress-label">
          {t('auditProgress')}: {verificationProgress} / {totalRooms} {t('rooms')}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(verificationProgress / totalRooms) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="rooms-container">
        {rooms.map((room) => (
          <div 
            key={room.id} 
            className={`room-item ${verifiedRooms.includes(room.id) ? 'verified' : ''}`}
          >
            <div className="room-info">
              <div className="room-number">Room {room.number}</div>
              <div className="room-system-status">
                {t('systemStatus')}: {room.systemStatus === 'occupied' ? (
                  <>🔴 {t('occupied')}</>
                ) : (
                  <>🟢 {t('available')}</>
                )}
              </div>
            </div>
            <button
              className="verify-btn"
              onClick={() => onVerifyRoom(room)}
              disabled={verifiedRooms.includes(room.id)}
            >
              {verifiedRooms.includes(room.id) ? '✅ ' : ''}
              {t('verify')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
