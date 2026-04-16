/**
 * Enumeration file for all constants used across the DigiStay application
 * Provides type-safe constants for roles, states, and configurations
 */

/**
 * User roles in the system
 */
export enum UserRole {
  RECEPTIONIST = 'receptionist',
  OWNER = 'owner',
  AUDITOR = 'auditor',
}

/**
 * Login screen states/steps
 */
export enum LoginState {
  LOGGED_OUT = 'logged_out',
  LOGGED_IN = 'logged_in',
  LOGGING_IN = 'logging_in',
}

/**
 * Owner Dashboard Tab names
 */
export enum OwnerTabName {
  MY_HOTELS = 'my-hotels',
  DASHBOARD = 'dashboard',
  HOTEL_CONFIG = 'hotel',
  ROOM_TYPES = 'rooms',
  ROOM_CONFIG = 'roomConfig',
  AMENITIES = 'amenities',
  AVAILABILITY = 'availability',
  RECEPTIONISTS = 'receptionists',
  AUDITOR_REPORT = 'auditorReport',
}

/**
 * Reception Screen step names
 */
export enum ReceptionStep {
  DASHBOARD = 'dashboard',
  BOOKING_FORM = 'form',
  ROOM_SELECTION = 'rooms',
  BOOKING_SUMMARY = 'summary',
}

/**
 * Auditor Screen step names
 */
export enum AuditorStep {
  HOTEL_SELECTION = 'hotel_selection',
  ROOM_LIST = 'room_list',
  ROOM_VERIFICATION = 'room_verification',
  AUDIT_SUMMARY = 'audit_summary',
}

/**
 * Room status types
 */
export enum RoomStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  MAINTENANCE = 'maintenance',
  CLEANING = 'cleaning',
  BLOCKED = 'blocked',
}

/**
 * Booking status types
 */
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CHECKED_IN = 'checked_in',
  CHECKED_OUT = 'checked_out',
  CANCELLED = 'cancelled',
}

/**
 * Hotel status types
 */
export enum HotelStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
}

/**
 * HTTP Status codes
 */
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * API response status
 */
export enum ApiResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  PENDING = 'pending',
}

/**
 * Error types
 */
export enum ErrorType {
  VALIDATION_ERROR = 'validation_error',
  AUTH_ERROR = 'auth_error',
  SERVER_ERROR = 'server_error',
  NETWORK_ERROR = 'network_error',
  NOT_FOUND = 'not_found',
}

/**
 * Form validation rules
 */
export const ValidationRules = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 128,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 64,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s\-+()]+$/,
} as const;

/**
 * Application configuration
 */
export const AppConfig = {
  DEMO_USERNAME: 'admin',
  DEMO_PASSWORD: 'password123',
  SESSION_TIMEOUT_MS: 3600000, // 1 hour
  API_BASE_URL: '/api',
} as const;
