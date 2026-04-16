import { formatDateDisplay, getDaysDifference, calculateBookingCost } from '../../utils/utility';
import './BookingSummary.css';

export default function BookingSummary({ bookingData, selectedRoom, onConfirm, onBack }) {
  // Calculate number of nights
  const checkIn = new Date(bookingData.checkInDate);
  const checkOut = new Date(bookingData.checkOutDate);
  const nights = getDaysDifference(checkIn, checkOut);
  const totalPrice = calculateBookingCost(selectedRoom.price, nights);

  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>

      <div className="summary-grid">
        {/* Guest Information */}
        <div className="summary-card">
          <h3>👤 Guest Information</h3>
          <div className="summary-details">
            <p><strong>Name:</strong> {bookingData.firstName} {bookingData.lastName}</p>
            <p><strong>Email:</strong> {bookingData.email}</p>
            <p><strong>Phone:</strong> {bookingData.phone}</p>
            <p><strong>Number of Guests:</strong> {bookingData.guests}</p>
          </div>
        </div>

        {/* Stay Details */}
        <div className="summary-card">
          <h3>📅 Stay Details</h3>
          <div className="summary-details">
            <p><strong>Check-In:</strong> {formatDateDisplay(checkIn)}</p>
            <p><strong>Check-Out:</strong> {formatDateDisplay(checkOut)}</p>
            <p><strong>Number of Nights:</strong> {nights}</p>
          </div>
        </div>

        {/* Room Details */}
        <div className="summary-card">
          <h3>{selectedRoom.image} Room Details</h3>
          <div className="summary-details">
            <p><strong>Room:</strong> {selectedRoom.name}</p>
            <p><strong>Type:</strong> {selectedRoom.type}</p>
            <p><strong>Capacity:</strong> {selectedRoom.capacity} guests</p>
            <p><strong>Price per Night:</strong> ₹{selectedRoom.price.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="summary-card">
          <h3>✨ Amenities</h3>
          <div className="amenities-list">
            {selectedRoom.amenities.map((amenity, idx) => (
              <span key={idx} className="amenity-tag">
                ✓ {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="price-breakdown">
        <h3>💰 Price Breakdown</h3>
        <div className="breakdown-table">
          <div className="breakdown-row">
            <span>₹{selectedRoom.price.toLocaleString('en-IN')} × {nights} night{nights > 1 ? 's' : ''}</span>
            <span>₹{(selectedRoom.price * nights).toLocaleString('en-IN')}</span>
          </div>
          <div className="breakdown-row">
            <span>Taxes & Fees (10%)</span>
            <span>₹{(selectedRoom.price * nights * 0.1).toLocaleString('en-IN')}</span>
          </div>
          <div className="breakdown-row total">
            <span>Total Amount</span>
            <span>₹{(selectedRoom.price * nights * 1.1).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="summary-actions">
        <button className="back-btn" onClick={onBack}>
          ← Back to Room Selection
        </button>
        <button className="confirm-btn" onClick={onConfirm}>
          ✓ Confirm Booking
        </button>
      </div>
    </div>
  );
}
