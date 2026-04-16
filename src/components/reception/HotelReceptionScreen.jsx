import { useState, useEffect } from 'react';
import ReceptionDashboard from './ReceptionDashboard';
import BookingForm from '../booking/BookingForm';
import RoomSelection from '../booking/RoomSelection';
import BookingSummary from '../booking/BookingSummary';
import { ReceptionStep } from '../common/enums';
import './HotelReceptionScreen.css';

export default function HotelReceptionScreen({ onSwitchToOwner, onLogout }) {
  const [step, setStep] = useState(ReceptionStep.DASHBOARD);
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
  });
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleNewBooking = () => {
    setStep(ReceptionStep.BOOKING_FORM);
  };

  const handleFormSubmit = (data) => {
    setBookingData(data);
    setStep('rooms');
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setStep(ReceptionStep.BOOKING_SUMMARY);
  };

  const handleConfirmBooking = () => {
    alert('Booking confirmed! Confirmation sent to ' + bookingData.email);
    // Reset to dashboard
    setStep(ReceptionStep.DASHBOARD);
    setBookingData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      checkInDate: '',
      checkOutDate: '',
      guests: 1,
    });
    setSelectedRoom(null);
  };

  const handleBackClick = () => {
    if (step === ReceptionStep.ROOM_SELECTION) {
      setStep(ReceptionStep.BOOKING_FORM);
    } else if (step === ReceptionStep.BOOKING_SUMMARY) {
      setStep(ReceptionStep.ROOM_SELECTION);
    } else if (step === ReceptionStep.BOOKING_FORM) {
      setStep(ReceptionStep.DASHBOARD);
    }
  };

  return (
    <div className="hotel-reception-screen">
      <main className="reception-main">
        {step === ReceptionStep.DASHBOARD && (
          <ReceptionDashboard onNewBooking={handleNewBooking} onSwitchToOwner={onSwitchToOwner} onLogout={onLogout} />
        )}

        {step === ReceptionStep.BOOKING_FORM && (
          <>
          <BookingForm onSubmit={handleFormSubmit} onBack={handleBackClick} />
          </>
        )}

        {step === ReceptionStep.ROOM_SELECTION && (
          <>
            <div className="step-indicator">
              <span className="step active">1. Guest Info</span>
              <span className="step active">2. Select Room</span>
              <span className="step">3. Confirm</span>
            </div>
            <RoomSelection 
              onSelect={handleRoomSelect}
              guests={bookingData.guests}
              bookingData={bookingData}
            />
            <button className="back-btn" onClick={handleBackClick}>
              ← Back
            </button>
          </>
        )}

        {step === ReceptionStep.BOOKING_SUMMARY && (
          <>
            <div className="step-indicator">
              <span className="step active">1. Guest Info</span>
              <span className="step active">2. Select Room</span>
              <span className="step active">3. Confirm</span>
            </div>
            <BookingSummary 
              bookingData={bookingData}
              selectedRoom={selectedRoom}
              onConfirm={handleConfirmBooking}
              onBack={handleBackClick}
            />
          </>
        )}
      </main>
    </div>
  );
}
