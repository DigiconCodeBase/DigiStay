import { useState, useEffect, useRef } from 'react';
import './DatePicker.css';

/**
 * DatePicker Component
 * Reusable date picker with custom UI supporting both display and input formats
 * 
 * Props:
 * - value: Current selected date in "DD Mon YYYY" format (e.g., "18 Apr 2026")
 * - onChange: Callback function when date changes
 * - label: Label text for the date picker (optional)
 * - placeholder: Placeholder text (optional)
 * - disabled: Disable the date picker (optional)
 * - minDate: Minimum date in Date object (optional)
 * - maxDate: Maximum date in Date object (optional)
 */
export default function DatePicker({ 
  value, 
  onChange, 
  label = 'Select Date',
  placeholder = 'Pick a date...',
  disabled = false,
  minDate = null,
  maxDate = null
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // Helper: Convert display format (DD Mon YYYY) to input format (YYYY-MM-DD)
  const displayToInputFormat = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split(' ');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = parseInt(parts[0]);
    const month = monthNames.indexOf(parts[1]) + 1;
    const year = parseInt(parts[2]);
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Helper: Convert input format (YYYY-MM-DD) to display format (DD Mon YYYY)
  const inputToDisplayFormat = (inputDate) => {
    if (!inputDate) return '';
    // Parse date string as local date, not UTC
    const [year, month, day] = inputDate.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const dayStr = String(date.getDate()).padStart(2, '0');
    const monthStr = date.toLocaleDateString('en-US', { month: 'short' });
    const yearStr = date.getFullYear();
    return `${dayStr} ${monthStr} ${yearStr}`;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const displayValue = inputToDisplayFormat(inputValue);
    onChange(displayValue);
  };

  const handleDateClick = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayStr = String(date.getDate()).padStart(2, '0');
    const inputDateStr = `${year}-${month}-${dayStr}`;
    const displayValue = inputToDisplayFormat(inputDateStr);
    onChange(displayValue);
    setIsOpen(false);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const dayStr = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${dayStr}`;
      const displayDateStr = inputToDisplayFormat(dateStr);
      const isSelected = value === displayDateStr;

      days.push(
        <button
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="datepicker-wrapper" ref={containerRef}>
      {label && <label className="datepicker-label">{label}</label>}
      
      <div className="datepicker-container">
        {/* Display Input */}
        <div className="datepicker-input-group">
          <input
            type="text"
            className="datepicker-display"
            value={value}
            readOnly
            placeholder={placeholder}
            disabled={disabled}
          />
          <button
            className="datepicker-toggle"
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled}
            title="Open date picker"
          >
            📅
          </button>
        </div>

        {/* Hidden HTML Input for form submission */}
        <input
          type="date"
          className="datepicker-hidden"
          value={displayToInputFormat(value)}
          onChange={handleInputChange}
          disabled={disabled}
          min={minDate ? minDate.toISOString().split('T')[0] : undefined}
          max={maxDate ? maxDate.toISOString().split('T')[0] : undefined}
        />

        {/* Calendar Popup */}
        {isOpen && !disabled && (
          <div className="datepicker-popup">
            <div className="calendar-header">
              <button className="month-nav" onClick={previousMonth}>
                ◀
              </button>
              <h3 className="month-year">{monthYear}</h3>
              <button className="month-nav" onClick={nextMonth}>
                ▶
              </button>
            </div>

            <div className="calendar-weekdays">
              <div className="weekday">Sun</div>
              <div className="weekday">Mon</div>
              <div className="weekday">Tue</div>
              <div className="weekday">Wed</div>
              <div className="weekday">Thu</div>
              <div className="weekday">Fri</div>
              <div className="weekday">Sat</div>
            </div>

            <div className="calendar-days">
              {renderCalendar()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
