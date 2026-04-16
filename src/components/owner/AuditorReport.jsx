import { useState } from 'react';
import { AUDIT_REPORTS_DATA } from '../../mockData/dummyData';
import './AuditorReport.css';

export default function AuditorReport({ hotel }) {
  const [selectedReport, setSelectedReport] = useState(null);
  
  // Get audit reports for the selected hotel from mock data
  const auditReports = AUDIT_REPORTS_DATA[hotel?.id] || [];

  return (
    <div className="auditor-report-container">
      <div className="report-header">
        <h2>📋 Auditor Reports - {hotel?.name}</h2>
        <p className="report-subtitle">Review all auditor inspection reports for this hotel</p>
      </div>

      <div className="reports-grid">
        {auditReports.map((report) => (
          <div key={report.id} className="report-card">
            <div className="report-card-header">
              <div className="auditor-info">
                <h3>{report.auditorName}</h3>
                <span className="report-date">{report.date}</span>
              </div>
              <span className={`status-badge ${report.status.toLowerCase()}`}>
                {report.status}
              </span>
            </div>

            <div className="report-card-body">
              <div className="report-stats">
                <div className="stat">
                  <span className="stat-label">Rooms Inspected</span>
                  <span className="stat-value">{report.rooms}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Issues Found</span>
                  <span className={`stat-value ${report.issues > 0 ? 'warning' : 'success'}`}>
                    {report.issues}
                  </span>
                </div>
              </div>

              <div className="report-notes">
                <p><strong>Report Notes:</strong></p>
                <p>{report.notes}</p>
              </div>
            </div>

            <div className="report-card-footer">
              <button 
                className="view-details-btn"
                onClick={() => setSelectedReport(report)}
              >
                View Full Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {auditReports.length === 0 && (
        <div className="no-reports">
          <p>No auditor reports available for this hotel yet.</p>
        </div>
      )}

      {/* Full Report Modal */}
      {selectedReport && (
        <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📋 Full Audit Report</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedReport(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="report-detail-section">
                <div className="detail-item">
                  <span className="detail-label">Auditor Name:</span>
                  <span className="detail-value">{selectedReport.auditorName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Audit Date:</span>
                  <span className="detail-value">{selectedReport.date}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status ${selectedReport.status.toLowerCase()}`}>
                    {selectedReport.status}
                  </span>
                </div>
              </div>

              <div className="report-detail-section">
                <h3>Inspection Summary</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Rooms Inspected</span>
                    <span className="summary-value">{selectedReport.rooms}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Issues Found</span>
                    <span className={`summary-value ${selectedReport.issues > 0 ? 'warning' : 'success'}`}>
                      {selectedReport.issues}
                    </span>
                  </div>
                </div>
              </div>

              <div className="report-detail-section">
                <h3>Detailed Notes</h3>
                <div className="notes-box">
                  <p>{selectedReport.notes}</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </button>
              <button className="download-btn">
                📥 Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
