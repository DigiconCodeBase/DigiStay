import { useTranslation } from '../../hooks/useTranslation';
import './AuditSummary.css';

export default function AuditSummary({ 
  hotel, 
  verifications, 
  onSubmitReport, 
  onBackToHotelSelection 
}) {
  const t = useTranslation();

  const totalRooms = verifications.length;
  const verifiedRooms = verifications.length;
  const mismatches = verifications.filter(v => v.mismatch);

  const issuesDescriptions = mismatches.map(mismatch => 
    mismatch.systemStatus === 'occupied' && mismatch.actualStatus === 'empty'
      ? `Room ${mismatch.roomNumber} (${t('emptyButMarkedOccupied')})`
      : `Room ${mismatch.roomNumber} (${t('occupiedButNotInSystem')})`
  );

  return (
    <div className="audit-summary">
      <div className="summary-header">
        <h1>✅ {t('auditComplete')}</h1>
        <h2>{hotel?.name}</h2>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-label">{t('totalRooms')}</div>
          <div className="card-value large">{totalRooms}</div>
        </div>
        
        <div className="summary-card">
          <div className="card-label">{t('verified')}</div>
          <div className="card-value success">{verifiedRooms}</div>
        </div>
        
        <div className="summary-card">
          <div className="card-label">{t('mismatch')}</div>
          <div className={`card-value ${mismatches.length > 0 ? 'error' : 'success'}`}>
            {mismatches.length}
          </div>
        </div>
      </div>

      {mismatches.length > 0 && (
        <div className="issues-section">
          <h3>{t('issuesFound')}:</h3>
          <div className="issues-list">
            {issuesDescriptions.map((issue, idx) => (
              <div key={idx} className="issue-item">
                <span className="issue-icon">❌</span>
                <span>{issue}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {mismatches.length === 0 && (
        <div className="no-issues">
          <div className="success-icon">🎉</div>
          <p>All rooms verified successfully! No mismatches found.</p>
        </div>
      )}

      <div className="summary-actions">
        <button 
          className="back-btn"
          onClick={onBackToHotelSelection}
        >
          ← {t('selectHotel')}
        </button>
        <button 
          className="submit-report-btn"
          onClick={() => onSubmitReport({
            hotelId: hotel?.id,
            hotelName: hotel?.name,
            totalRooms,
            verifiedRooms,
            mismatches: mismatches.length,
            issues: mismatches,
            timestamp: new Date().toISOString()
          })}
        >
          {t('submitFinalReport')}
        </button>
      </div>
    </div>
  );
}
