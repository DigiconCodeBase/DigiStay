import { useState } from 'react';
import { PAYMENT_REPORTS_DATA } from '../../mockData/dummyData';
import { PaymentStatus, PaymentType } from '../common/enums';
import './PaymentReport.css';

export default function PaymentReport({ hotel }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentTypes, setFilterPaymentTypes] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState('all'); // all, today, month, custom
  const [customDateStart, setCustomDateStart] = useState('');
  const [customDateEnd, setCustomDateEnd] = useState('');
  const [showPaymentTypeDropdown, setShowPaymentTypeDropdown] = useState(false);

  // Get payment reports for the selected hotel from mock data
  const paymentReports = PAYMENT_REPORTS_DATA[hotel?.id] || [];

  // Get today's date
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // Get first day of current month
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstDayString = firstDayOfMonth.toISOString().split('T')[0];

  // Filter by period
  const getFilteredByPeriod = (payments) => {
    return payments.filter(payment => {
      const paymentDate = payment.date;
      
      switch(filterPeriod) {
        case 'today':
          return paymentDate === todayString;
        case 'month':
          return paymentDate >= firstDayString && paymentDate <= todayString;
        case 'custom':
          if (!customDateStart || !customDateEnd) return true;
          return paymentDate >= customDateStart && paymentDate <= customDateEnd;
        default:
          return true;
      }
    });
  };

  // Toggle payment type selection
  const togglePaymentType = (type) => {
    setFilterPaymentTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Filter payments based on status, payment type, and period
  const filteredPayments = getFilteredByPeriod(
    paymentReports.filter(payment => {
      const statusMatch = filterStatus === 'all' || payment.status === filterStatus;
      const typeMatch = filterPaymentTypes.length === 0 || filterPaymentTypes.includes(payment.method);
      return statusMatch && typeMatch;
    })
  );

  // Calculate totals from filtered payments
  const totalRevenue = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalPending = filteredPayments
    .filter(p => p.status === PaymentStatus.PENDING)
    .reduce((sum, p) => sum + p.amount, 0);
  const totalCompleted = filteredPayments
    .filter(p => p.status === PaymentStatus.COMPLETED)
    .reduce((sum, p) => sum + p.amount, 0);

  // Format period label
  const getPeriodLabel = () => {
    switch(filterPeriod) {
      case 'today':
        return `Today (${todayString})`;
      case 'month':
        return `This Month (${firstDayString} to ${todayString})`;
      case 'custom':
        return customDateStart && customDateEnd 
          ? `${customDateStart} to ${customDateEnd}`
          : 'Custom Period';
      default:
        return 'All Time';
    }
  };

  return (
    <div className="payment-report-container">
      <div className="report-header">
        <h2>💰 Payment Reports - {hotel?.name}</h2>
        <p className="report-subtitle">Track all payments and transactions for this hotel</p>
      </div>

      {/* Summary Cards */}
      <div className="payment-summary">
        <div className="summary-card">
          <span className="summary-label">{getPeriodLabel()}</span>
          <span className="summary-value total">₹{totalRevenue.toLocaleString('en-IN')}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Completed</span>
          <span className="summary-value completed">₹{totalCompleted.toLocaleString('en-IN')}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Pending</span>
          <span className="summary-value pending">₹{totalPending.toLocaleString('en-IN')}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Transactions</span>
          <span className="summary-value transactions">{filteredPayments.length}</span>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-group">
          <label>Time Period:</label>
          <div className="filter-buttons">
            <button 
              className={`period-btn ${filterPeriod === 'all' ? 'active' : ''}`}
              onClick={() => setFilterPeriod('all')}
            >
              All Time
            </button>
            <button 
              className={`period-btn ${filterPeriod === 'today' ? 'active' : ''}`}
              onClick={() => setFilterPeriod('today')}
            >
              Today
            </button>
            <button 
              className={`period-btn ${filterPeriod === 'month' ? 'active' : ''}`}
              onClick={() => setFilterPeriod('month')}
            >
              This Month
            </button>
            <button 
              className={`period-btn ${filterPeriod === 'custom' ? 'active' : ''}`}
              onClick={() => setFilterPeriod('custom')}
            >
              Custom
            </button>
          </div>
        </div>

        {filterPeriod === 'custom' && (
          <div className="filter-group custom-dates">
            <label>Date Range:</label>
            <div className="date-inputs">
              <input 
                type="date"
                value={customDateStart}
                onChange={(e) => setCustomDateStart(e.target.value)}
                placeholder="Start Date"
              />
              <span>to</span>
              <input 
                type="date"
                value={customDateEnd}
                onChange={(e) => setCustomDateEnd(e.target.value)}
                placeholder="End Date"
              />
            </div>
          </div>
        )}

        <div className="filter-group">
          <label>Filter by Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Payments</option>
            <option value={PaymentStatus.COMPLETED}>Completed</option>
            <option value={PaymentStatus.PENDING}>Pending</option>
            <option value={PaymentStatus.FAILED}>Failed</option>
            <option value={PaymentStatus.REFUNDED}>Refunded</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Payment Type:</label>
          <div className="multi-select-dropdown">
            <button 
              className="dropdown-toggle"
              onClick={() => setShowPaymentTypeDropdown(!showPaymentTypeDropdown)}
            >
              {filterPaymentTypes.length === 0 
                ? 'Select payment types...' 
                : `${filterPaymentTypes.length} selected`}
              <span className="dropdown-arrow">▼</span>
            </button>
            {showPaymentTypeDropdown && (
              <div className="dropdown-menu">
                <label className="dropdown-option">
                  <input 
                    type="checkbox" 
                    checked={filterPaymentTypes.includes(PaymentType.CREDIT_CARD)}
                    onChange={() => togglePaymentType(PaymentType.CREDIT_CARD)}
                  />
                  <span>{PaymentType.CREDIT_CARD}</span>
                </label>
                <label className="dropdown-option">
                  <input 
                    type="checkbox" 
                    checked={filterPaymentTypes.includes(PaymentType.DEBIT_CARD)}
                    onChange={() => togglePaymentType(PaymentType.DEBIT_CARD)}
                  />
                  <span>{PaymentType.DEBIT_CARD}</span>
                </label>
                <label className="dropdown-option">
                  <input 
                    type="checkbox" 
                    checked={filterPaymentTypes.includes(PaymentType.UPI)}
                    onChange={() => togglePaymentType(PaymentType.UPI)}
                  />
                  <span>{PaymentType.UPI}</span>
                </label>
                <label className="dropdown-option">
                  <input 
                    type="checkbox" 
                    checked={filterPaymentTypes.includes(PaymentType.BANK_TRANSFER)}
                    onChange={() => togglePaymentType(PaymentType.BANK_TRANSFER)}
                  />
                  <span>{PaymentType.BANK_TRANSFER}</span>
                </label>
                <label className="dropdown-option">
                  <input 
                    type="checkbox" 
                    checked={filterPaymentTypes.includes(PaymentType.CASH)}
                    onChange={() => togglePaymentType(PaymentType.CASH)}
                  />
                  <span>{PaymentType.CASH}</span>
                </label>
                <label className="dropdown-option">
                  <input 
                    type="checkbox" 
                    checked={filterPaymentTypes.includes(PaymentType.WALLET)}
                    onChange={() => togglePaymentType(PaymentType.WALLET)}
                  />
                  <span>{PaymentType.WALLET}</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="payments-table-container">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Guest Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment.id} className={`status-${payment.status}`}>
                <td className="payment-id">#{payment.id}</td>
                <td className="guest-name">{payment.guestName}</td>
                <td className="amount">₹{payment.amount.toLocaleString('en-IN')}</td>
                <td className="date">{payment.date}</td>
                <td className="method">{payment.method}</td>
                <td className="status">
                  <span className={`status-badge ${payment.status}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
                <td className="action">
                  <button 
                    className="view-btn"
                    onClick={() => setSelectedPayment(payment)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPayments.length === 0 && (
        <div className="no-payments">
          <p>No payments found for this filter.</p>
        </div>
      )}

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="modal-overlay" onClick={() => setSelectedPayment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💳 Payment Details</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedPayment(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <div className="detail-row">
                  <span className="detail-label">Payment ID:</span>
                  <span className="detail-value">#{selectedPayment.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Guest Name:</span>
                  <span className="detail-value">{selectedPayment.guestName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Booking ID:</span>
                  <span className="detail-value">{selectedPayment.bookingId}</span>
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-row">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value amount">₹{selectedPayment.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Date:</span>
                  <span className="detail-value">{selectedPayment.date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Time:</span>
                  <span className="detail-value">{selectedPayment.time}</span>
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-row">
                  <span className="detail-label">Payment Method:</span>
                  <span className="detail-value">{selectedPayment.method}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status ${selectedPayment.status}`}>
                    {selectedPayment.status.toUpperCase()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Reference No:</span>
                  <span className="detail-value">{selectedPayment.referenceNo}</span>
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-row">
                  <span className="detail-label">Notes:</span>
                  <span className="detail-value">{selectedPayment.notes}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedPayment(null)}
              >
                Close
              </button>
              <button className="receipt-btn">
                📄 Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
