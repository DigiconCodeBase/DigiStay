import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AuditorStep } from '../common/enums';
import AuditorDashboard from './AuditorDashboard';
import AuditorRoomList from './AuditorRoomList';
import RoomVerification from './RoomVerification';
import AuditSummary from './AuditSummary';
import './AuditorScreen.css';

const generateMockRooms = (hotelId, totalRooms) => {
  const rooms = [];
  for (let i = 0; i < totalRooms; i++) {
    rooms.push({
      id: `room_${hotelId}_${i + 1}`,
      number: String(i + 1).padStart(3, '0'),
      systemStatus: Math.random() > 0.6 ? 'occupied' : 'available',
      type: ['Single', 'Double', 'Suite'][Math.floor(Math.random() * 3)],
      floor: Math.floor(i / 10) + 1,
    });
  }
  return rooms;
};

export default function AuditorScreen({ onLogout }) {
  const user = useSelector((state) => state.auth.user);
  const [step, setStep] = useState(AuditorStep.HOTEL_SELECTION);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [verifiedRooms, setVerifiedRooms] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleSelectHotel = (hotel) => {
    const rooms = generateMockRooms(hotel.id, hotel.totalRooms);
    setSelectedHotel(hotel);
    setHotelRooms(rooms);
    setVerifiedRooms([]);
    setVerifications([]);
    setStep(AuditorStep.ROOM_LIST);
  };

  const handleVerifyRoom = (room) => {
    setCurrentRoom(room);
    setStep(AuditorStep.ROOM_VERIFICATION);
  };

  const handleSubmitVerification = (verification) => {
    const roomId = verification.roomId;
    setVerifications([...verifications, verification]);
    setVerifiedRooms([...verifiedRooms, roomId]);
    setStep(AuditorStep.ROOM_LIST);
  };

  const handleBackToRoomList = () => {
    setStep(AuditorStep.ROOM_LIST);
  };

  const handleBackToHotelSelection = () => {
    setStep(AuditorStep.HOTEL_SELECTION);
    setSelectedHotel(null);
    setHotelRooms([]);
    setVerifiedRooms([]);
    setVerifications([]);
  };

  const handleAllRoomsVerified = () => {
    setStep(AuditorStep.AUDIT_SUMMARY);
  };

  const handleSubmitReport = (report) => {
    console.log('Audit Report Submitted:', report);
    alert('Audit report submitted successfully!');
    handleBackToHotelSelection();
  };

  const handleCompleteAudit = () => {
    if (verifiedRooms.length === hotelRooms.length) {
      handleAllRoomsVerified();
    } else {
      alert(`Please verify all ${hotelRooms.length} rooms before completing the audit.`);
    }
  };

  return (
    <div className="auditor-screen">
      {step === AuditorStep.HOTEL_SELECTION && (
        <AuditorDashboard 
          onSelectHotel={handleSelectHotel}
          auditorName={user?.username}
        />
      )}

      {step === AuditorStep.ROOM_LIST && (
        <>
          <AuditorRoomList
            hotel={selectedHotel}
            rooms={hotelRooms}
            onVerifyRoom={handleVerifyRoom}
            onBack={handleBackToHotelSelection}
            verifiedRooms={verifiedRooms}
          />
          {verifiedRooms.length === hotelRooms.length && (
            <div className="complete-audit-floating">
              <button 
                className="complete-audit-btn"
                onClick={handleCompleteAudit}
              >
                ✅ Complete Audit
              </button>
            </div>
          )}
        </>
      )}

      {step === AuditorStep.ROOM_VERIFICATION && currentRoom && (
        <RoomVerification
          room={currentRoom}
          onSubmit={handleSubmitVerification}
          onBack={handleBackToRoomList}
        />
      )}

      {step === AuditorStep.AUDIT_SUMMARY && (
        <AuditSummary
          hotel={selectedHotel}
          verifications={verifications}
          onSubmitReport={handleSubmitReport}
          onBackToHotelSelection={handleBackToHotelSelection}
        />
      )}

      <div className="auditor-footer">
        <button className="footer-btn danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
