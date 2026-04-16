/**
 * Utility Functions for DigiStay Hotels Application
 * Centralized utility functions used across the application
 */

/**
 * Format date as "DD Mon YYYY" (e.g., "18 Apr 2026")
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDateDisplay(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format date as "Mon DD, YYYY" (e.g., "Apr 18, 2026")
 * Used for booking dates display
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDateBooking(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Add days to a date
 * @param {Date} date - The base date
 * @param {number} days - Number of days to add
 * @returns {Date} New date object
 */
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Subtract days from a date
 * @param {Date} date - The base date
 * @param {number} days - Number of days to subtract
 * @returns {Date} New date object
 */
export function subtractDays(date, days) {
  return addDays(date, -days);
}

/**
 * Check if two dates are the same day
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} True if same day
 */
export function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Get difference in days between two dates
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} Number of days difference
 */
export function getDaysDifference(date1, date2) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((date2 - date1) / millisecondsPerDay);
}

/**
 * Format time as "HH:MM" (e.g., "14:30")
 * @param {string} timeString - Time in "HH:MM" or "H:MM" format
 * @returns {string} Formatted time
 */
export function formatTime(timeString) {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 */
export function isValidPhone(phone) {
  return /^[+\d\-\s()]{10,}$/.test(phone);
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate random username from name
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @returns {string} Generated username
 */
export function generateUsername(firstName, lastName) {
  const base = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`.replace(/\s+/g, '_');
  const random = Math.floor(Math.random() * 1000);
  return `${base}_${random}`;
}

/**
 * Generate strong password
 * @param {number} length - Password length (default 12)
 * @returns {string} Generated password
 */
export function generateStrongPassword(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 * Format currency (INR)
 * @param {number} amount - Amount in rupees
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Calculate total booking cost
 * @param {number} pricePerNight - Price per night
 * @param {number} nights - Number of nights
 * @returns {number} Total cost
 */
export function calculateBookingCost(pricePerNight, nights) {
  return pricePerNight * nights;
}

/**
 * Deep copy an object
 * @param {object} obj - Object to copy
 * @returns {object} Deep copied object
 */
export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
