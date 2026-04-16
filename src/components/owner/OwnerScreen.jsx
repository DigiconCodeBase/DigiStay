import { useState } from 'react';
import { useSelector } from 'react-redux';
import OwnerDashboard from './OwnerDashboard';
import MyHotels from './MyHotels';
import HotelConfiguration from './HotelConfiguration';
import RoomTypeManagement from './RoomTypeManagement';
import RoomConfiguration from './RoomConfiguration';
import AmenitiesManagement from './AmenitiesManagement';
import RoomAvailability from './RoomAvailability';
import ReceptionistRegistration from './ReceptionistRegistration';
import AuditorReport from './AuditorReport';
import PaymentReport from './PaymentReport';
import SettingsModal from '../settings/SettingsModal';
import { getInitialHotelsData } from '../../mockData/dummyData';
import { OwnerTabName, UserRole } from '../common/enums';
import './OwnerScreen.css';

export default function OwnerScreen({ onSwitchToReception, onLogout }) {
  const userRole = useSelector((state) => state.auth.userRole);
  const [activeTab, setActiveTab] = useState(OwnerTabName.MY_HOTELS);
  const [selectedHotelId, setSelectedHotelId] = useState(1);
  const [hotels, setHotels] = useState(getInitialHotelsData());
  const [showSettings, setShowSettings] = useState(false);

  const selectedHotel = hotels.find(h => h.id === selectedHotelId);

  const handleSelectHotel = (hotelId) => {
    setSelectedHotelId(hotelId);
    if (activeTab === OwnerTabName.MY_HOTELS) {
      setActiveTab(OwnerTabName.DASHBOARD);
    }
  };

  return (
    <div className="owner-screen">
      <header className="owner-header">
        <div className="owner-header-left">
          <h1>🏨 Hotel Owner Dashboard</h1>
          <p>Manage your hotel configuration and operations</p>
          {selectedHotel && (
            <div className="selected-hotel-info">
              <span className="hotel-label">Currently Managing:</span>
              <span className="hotel-name">{selectedHotel.name}</span>
              <span className="hotel-city">({selectedHotel.city})</span>
            </div>
          )}
        </div>
        <div className="header-actions">
            <button className="switch-view-btn" onClick={onSwitchToReception}>
              👨‍💼 Reception View
            </button>
            <button 
              className="settings-btn" 
              onClick={() => setShowSettings(true)}
              title="Settings"
            >
              ⚙️
            </button>
          <button className="logout-btn" onClick={onLogout} title="Logout">
            🔓
          </button>
        </div>
      </header>

      <nav className="owner-nav">
        <button 
          className={`nav-btn ${activeTab === OwnerTabName.MY_HOTELS ? 'active' : ''}`}
          onClick={() => setActiveTab(OwnerTabName.MY_HOTELS)}
        >
          🏨 My Hotels
        </button>
        {selectedHotel && (
          <>
            <button 
              className={`nav-btn ${activeTab === OwnerTabName.DASHBOARD ? 'active' : ''}`}
              onClick={() => setActiveTab(OwnerTabName.DASHBOARD)}
            >
              📊 Dashboard
            </button>
            <button 
              className={`nav-btn ${activeTab === OwnerTabName.HOTEL_CONFIG ? 'active' : ''}`}
              onClick={() => setActiveTab(OwnerTabName.HOTEL_CONFIG)}
            >
              🏨 Hotel Details
            </button>
            <button 
              className={`nav-btn ${activeTab === OwnerTabName.ROOM_TYPES ? 'active' : ''}`}
              onClick={() => setActiveTab(OwnerTabName.ROOM_TYPES)}
            >
              🛏️ Room Types
            </button>
            <button 
              className={`nav-btn ${activeTab === OwnerTabName.ROOM_CONFIG ? 'active' : ''}`}
              onClick={() => setActiveTab(OwnerTabName.ROOM_CONFIG)}
            >
              🔧 Room Configuration
            </button>
            <button 
              className={`nav-btn ${activeTab === OwnerTabName.AMENITIES ? 'active' : ''}`}
              onClick={() => setActiveTab(OwnerTabName.AMENITIES)}
            >
              ✨ Amenities
            </button>
            <button 
              className={`nav-btn ${activeTab === OwnerTabName.AVAILABILITY ? 'active' : ''}`}
              onClick={() => setActiveTab(OwnerTabName.AVAILABILITY)}
            >
              📅 Availability
            </button>
            <button 
              className={`nav-btn ${activeTab === OwnerTabName.RECEPTIONISTS ? 'active' : ''}`}
              onClick={() => setActiveTab(OwnerTabName.RECEPTIONISTS)}
            >
              👥 Receptionists
            </button>
            <button 
              className={`nav-btn ${activeTab === OwnerTabName.AUDITOR_REPORT ? 'active' : ''}`}
              onClick={() => setActiveTab(OwnerTabName.AUDITOR_REPORT)}
            >
              📋 Auditor Reports
            </button>
            <button 
              className={`nav-btn ${activeTab === OwnerTabName.PAYMENT_REPORT ? 'active' : ''}`}
              onClick={() => setActiveTab(OwnerTabName.PAYMENT_REPORT)}
            >
              💰 Payment Reports
            </button>
          </>
        )}
      </nav>

      <main className="owner-main">
        {activeTab === OwnerTabName.MY_HOTELS && <MyHotels onSelectHotel={handleSelectHotel} selectedHotelId={selectedHotelId} />}
        {selectedHotel && activeTab === OwnerTabName.DASHBOARD && <OwnerDashboard hotel={selectedHotel} />}
        {selectedHotel && activeTab === OwnerTabName.HOTEL_CONFIG && <HotelConfiguration hotel={selectedHotel} />}
        {selectedHotel && activeTab === OwnerTabName.ROOM_TYPES && <RoomTypeManagement hotel={selectedHotel} />}
        {selectedHotel && activeTab === OwnerTabName.ROOM_CONFIG && <RoomConfiguration hotel={selectedHotel} />}
        {selectedHotel && activeTab === OwnerTabName.AMENITIES && <AmenitiesManagement hotel={selectedHotel} />}
        {selectedHotel && activeTab === OwnerTabName.AVAILABILITY && <RoomAvailability hotel={selectedHotel} />}
        {selectedHotel && activeTab === OwnerTabName.RECEPTIONISTS && <ReceptionistRegistration hotel={selectedHotel} />}
        {selectedHotel && activeTab === OwnerTabName.AUDITOR_REPORT && <AuditorReport hotel={selectedHotel} />}
        {selectedHotel && activeTab === OwnerTabName.PAYMENT_REPORT && <PaymentReport hotel={selectedHotel} />}
      </main>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
