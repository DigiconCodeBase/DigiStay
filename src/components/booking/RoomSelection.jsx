import { useState } from 'react';
import { AVAILABLE_ROOMS } from '../../mockData/dummyData';
import { useTranslation } from '../../hooks/useTranslation';
import './RoomSelection.css';

export default function RoomSelection({ onSelect, guests, bookingData }) {
  const t = useTranslation();
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const suitableRooms = AVAILABLE_ROOMS.filter(room => room.capacity >= guests);

  const calculateNights = () => {
    if (bookingData?.checkInDate && bookingData?.checkOutDate) {
      const checkIn = new Date(bookingData.checkInDate);
      const checkOut = new Date(bookingData.checkOutDate);
      return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const nights = calculateNights();

  return (
    <div className="room-selection">
      <h2>{t('selectYourRoom')}</h2>
      <p className="room-count">
        Showing {suitableRooms.length} room(s) suitable for {guests} guest{guests > 1 ? 's' : ''}
      </p>

      {bookingData && (bookingData.checkInDate || bookingData.checkOutDate) && (
        <div className="booking-details-preview">
          <div className="preview-item">
            <span className="preview-label">{t('guests')}:</span>
            <span className="preview-value">{guests}</span>
          </div>
          {nights > 0 && (
            <div className="preview-item">
              <span className="preview-label">{t('duration')}:</span>
              <span className="preview-value">{nights} night{nights > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      )}

      <div className="rooms-grid">
        {suitableRooms.map(room => (
          <div
            key={room.id}
            className={`room-card ${hoveredRoom === room.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredRoom(room.id)}
            onMouseLeave={() => setHoveredRoom(null)}
          >
            <div className="room-image">{room.image}</div>
            
            <div className="room-content">
              <h3>{room.name}</h3>
              <p className="room-type"><strong>{t('type')}:</strong> {room.type}</p>
              <p className="room-description">{room.description}</p>

              <div className="room-details">
                <div className="detail-item">
                  <span className="detail-label">{t('capacity')}:</span>
                  <span className="detail-value">{room.capacity} {room.capacity > 1 ? t('guests') : t('guest')}</span>
                </div>
              </div>

              <div className="room-amenities">
                <span className="amenity-label">{t('amenities')}:</span>
                <ul>
                  {room.amenities.map((amenity, idx) => (
                    <li key={idx}>{amenity}</li>
                  ))}
                </ul>
              </div>

              <div className="room-footer">
                <div className="room-price">
                  <span className="price">₹{room.price.toLocaleString('en-IN')}</span>
                  <span className="per-night">{t('perNight')}</span>
                  {nights > 0 && (
                    <span className="total-price">₹{(room.price * nights).toLocaleString('en-IN')} {t('total')}</span>
                  )}
                </div>
              </div>
            </div>

            <button 
              className="select-btn"
              onClick={() => onSelect(room)}
            >
              {t('selectRoom')}
            </button>
          </div>
        ))}
      </div>

      {suitableRooms.length === 0 && (
        <div className="no-rooms">
          <p>{t('noSuitableRooms')} {guests} {t('guests')}.</p>
          <p>{t('pleaseAdjustPreferences')}</p>
        </div>
      )}
    </div>
  );
}
