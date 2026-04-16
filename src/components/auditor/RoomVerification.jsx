import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './RoomVerification.css';

export default function RoomVerification({ 
  room, 
  onSubmit, 
  onBack 
}) {
  const t = useTranslation();
  const [actualStatus, setActualStatus] = useState(null);
  const [note, setNote] = useState('');
  const [photoAdded, setPhotoAdded] = useState(false);

  const handleSubmit = () => {
    if (actualStatus === null) {
      alert('Please select the actual room status');
      return;
    }

    onSubmit({
      roomId: room.id,
      systemStatus: room.systemStatus,
      actualStatus,
      note,
      hasPhoto: photoAdded,
      mismatch: room.systemStatus !== actualStatus
    });
  };

  const isMismatch = room.systemStatus !== actualStatus && actualStatus !== null;

  return (
    <div className="room-verification">
      <div className="verification-header">
        <button className="back-btn" onClick={onBack}>
          ← Room {room.number}
        </button>
      </div>

      <div className="verification-container">
        <div className="system-status-card">
          <h3>{t('systemStatus')}</h3>
          <div className={`status-badge ${room.systemStatus}`}>
            {room.systemStatus === 'occupied' ? <>🔴 {t('occupied')}</> : <>🟢 {t('available')}</>}
          </div>
        </div>

        <div className="divider"></div>

        <div className="status-selection">
          <h3>{t('actualStatus')}</h3>
          
          <div className="status-buttons">
            <button
              className={`status-btn occupied ${actualStatus === 'occupied' ? 'selected' : ''}`}
              onClick={() => setActualStatus('occupied')}
            >
              ✅ {t('occupied')}
            </button>
            <button
              className={`status-btn empty ${actualStatus === 'empty' ? 'selected' : ''}`}
              onClick={() => setActualStatus('empty')}
            >
              ❌ {t('empty')}
            </button>
          </div>

          {isMismatch && (
            <div className="mismatch-warning">
              ⚠️ {t('mismatch')} detected!
            </div>
          )}
        </div>

        <div className="divider"></div>

        <div className="notes-section">
          <label htmlFor="note">{t('addNote')}</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter additional notes..."
            rows="4"
          ></textarea>
        </div>

        <div className="divider"></div>

        <div className="photo-section">
          <label htmlFor="photo">📸 {t('addPhoto')}</label>
          <div className="photo-upload">
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={() => setPhotoAdded(true)}
            />
            <span>{photoAdded ? '✅ Photo added' : 'No photo selected'}</span>
          </div>
        </div>

        <div className="divider"></div>

        <button 
          className="submit-btn"
          onClick={handleSubmit}
        >
          {t('submitVerification')}
        </button>
      </div>
    </div>
  );
}
