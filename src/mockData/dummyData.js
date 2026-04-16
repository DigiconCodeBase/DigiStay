/**
 * Centralized Dummy Data for DigiStay Hotels Application
 * This file contains all mock data used across the application
 * Easily replaceable with real API/backend data in the future
 */

import { formatDateBooking, addDays, deepCopy } from '../utils/utility';
import { PaymentType, PaymentStatus } from '../components/common/enums';

// ============================================
// CURRENT DATE - Update this to change all reference dates
// ============================================
export const CURRENT_DATE = new Date(); // Always uses today's current date

// Generate dynamic date keys for bookings
const DATE_0 = formatDateBooking(CURRENT_DATE);
const DATE_1 = formatDateBooking(addDays(CURRENT_DATE, 1));
const DATE_2 = formatDateBooking(addDays(CURRENT_DATE, 2));
export const HOTELS_DATA = [
  {
    id: 1,
    name: 'DigiStay Mumbai',
    city: 'Mumbai',
    rooms: 12,
    email: 'mumbai@digistay.in',
    phone: '+91-9876543210',
    address: 'Plot No. 123, Business Complex, Mumbai, Maharashtra, 400001',
    state: 'Maharashtra',
    zipCode: '400001',
    description: 'A premium hotel with excellent amenities and hospitality',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    roomsData: [
      {
        id: 1,
        roomNumber: 101,
        floor: 1,
        roomType: 'Standard Room',
        capacity: 2,
        amenities: ['WiFi', 'TV', 'AC', 'Bathroom']
      },
      {
        id: 2,
        roomNumber: 102,
        floor: 1,
        roomType: 'Standard Room',
        capacity: 2,
        amenities: ['WiFi', 'TV', 'AC', 'Bathroom']
      },
      {
        id: 3,
        roomNumber: 103,
        floor: 1,
        roomType: 'Deluxe Room',
        capacity: 3,
        amenities: ['WiFi', 'Smart TV', 'AC', 'Bathroom', 'Mini Bar']
      }
    ],
    roomTypes: [
      {
        id: 1,
        name: 'Standard Room',
        capacity: 2,
        pricePerNight: 7900,
        description: 'Comfortable room with queen bed'
      },
      {
        id: 2,
        name: 'Deluxe Room',
        capacity: 3,
        pricePerNight: 11900,
        description: 'Spacious room with premium amenities'
      }
    ],
    amenities: [
      { id: 1, name: 'WiFi', icon: '📡', category: 'Technology' },
      { id: 2, name: 'TV', icon: '📺', category: 'Entertainment' },
      { id: 3, name: 'Air Conditioning', icon: '❄️', category: 'Climate' }
    ]
  },
  {
    id: 2,
    name: 'DigiStay Goa',
    city: 'Goa',
    rooms: 18,
    email: 'goa@digistay.in',
    phone: '+91-9876543211',
    address: 'Beach Road, Goa, 403001',
    state: 'Goa',
    zipCode: '403001',
    description: 'Beachside resort with relaxing ambiance',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    roomsData: [
      {
        id: 4,
        roomNumber: 201,
        floor: 2,
        roomType: 'Deluxe Room',
        capacity: 3,
        amenities: ['WiFi', 'Smart TV', 'AC', 'Bathroom', 'Mini Bar']
      },
      {
        id: 5,
        roomNumber: 202,
        floor: 2,
        roomType: 'Suite',
        capacity: 4,
        amenities: ['WiFi', '4K TV', 'AC', 'Jacuzzi', 'Mini Bar', 'Bathrobe']
      }
    ],
    roomTypes: [
      {
        id: 1,
        name: 'Deluxe Room',
        capacity: 3,
        pricePerNight: 11900,
        description: 'Spacious room with premium amenities'
      },
      {
        id: 2,
        name: 'Suite',
        capacity: 4,
        pricePerNight: 19900,
        description: 'Luxury suite with separate living area'
      }
    ],
    amenities: [
      { id: 1, name: 'WiFi', icon: '📡', category: 'Technology' },
      { id: 2, name: 'Swimming Pool', icon: '🏊', category: 'Recreation' }
    ]
  },
  {
    id: 3,
    name: 'DigiStay Bangalore',
    city: 'Bangalore',
    rooms: 25,
    email: 'bangalore@digistay.in',
    phone: '+91-9876543212',
    address: 'Tech Park, Bangalore, 560001',
    state: 'Karnataka',
    zipCode: '560001',
    description: 'Modern business hotel in tech city',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    roomsData: [
      {
        id: 6,
        roomNumber: 301,
        floor: 3,
        roomType: 'Standard Room',
        capacity: 2,
        amenities: ['WiFi', 'TV', 'AC']
      }
    ],
    roomTypes: [
      {
        id: 1,
        name: 'Standard Room',
        capacity: 2,
        pricePerNight: 7900,
        description: 'Comfortable room with queen bed'
      },
      {
        id: 2,
        name: 'Family Room',
        capacity: 5,
        pricePerNight: 15900,
        description: 'Spacious room perfect for families'
      }
    ],
    amenities: [
      { id: 1, name: 'WiFi', icon: '📡', category: 'Technology' },
      { id: 2, name: 'Air Conditioning', icon: '❄️', category: 'Climate' }
    ]
  }
];

// ============================================
// ROOMS DATA - Guest and Occupancy Information
// ============================================
export const ROOMS_DATA = [
  { id: 101, type: 'Standard Double', status: 'occupied', guest: 'Arjun Singh', checkOut: formatDateBooking(CURRENT_DATE) },
  { id: 102, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
  { id: 103, type: 'Deluxe Suite', status: 'occupied', guest: 'Priya Sharma', checkOut: formatDateBooking(addDays(CURRENT_DATE, -1)) },
  { id: 104, type: 'Standard Double', status: 'cleaning', guest: null, checkOut: null },
  { id: 105, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
  { id: 201, type: 'Deluxe Suite', status: 'occupied', guest: 'Amit Patel', checkOut: formatDateBooking(addDays(CURRENT_DATE, 3)) },
  { id: 202, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
  { id: 203, type: 'Executive Suite', status: 'maintenance', guest: null, checkOut: null },
  { id: 204, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
  { id: 205, type: 'Deluxe Suite', status: 'occupied', guest: 'Neha Gupta', checkOut: formatDateBooking(addDays(CURRENT_DATE, -1)) },
  { id: 301, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
  { id: 302, type: 'Executive Suite', status: 'occupied', guest: 'Devesh Kumar', checkOut: formatDateBooking(CURRENT_DATE) }
];

// ============================================
// AVAILABLE ROOMS FOR BOOKING
// ============================================
export const AVAILABLE_ROOMS = [
  {
    id: 1,
    name: 'Standard Room',
    type: 'Standard',
    capacity: 2,
    price: 7900,
    description: 'Comfortable room with queen bed',
    amenities: ['WiFi', 'TV', 'AC', 'Bathroom'],
    image: '🛏️'
  },
  {
    id: 2,
    name: 'Deluxe Room',
    type: 'Deluxe',
    capacity: 3,
    price: 11900,
    description: 'Spacious room with premium amenities',
    amenities: ['WiFi', 'Smart TV', 'AC', 'Bathroom', 'Mini Bar'],
    image: '🏰'
  },
  {
    id: 3,
    name: 'Suite',
    type: 'Suite',
    capacity: 4,
    price: 19900,
    description: 'Luxury suite with separate living area',
    amenities: ['WiFi', '4K TV', 'AC', 'Jacuzzi', 'Mini Bar', 'Bathrobe'],
    image: '👑'
  },
  {
    id: 4,
    name: 'Family Room',
    type: 'Family',
    capacity: 5,
    price: 15900,
    description: 'Spacious room perfect for families',
    amenities: ['WiFi', 'Smart TV', 'AC', '2 Bathrooms', 'Kitchen', 'Living Area'],
    image: '👨‍👩‍👧‍👦'
  }
];

// ============================================
// ROOM AVAILABILITY DATA - Per Hotel
// ============================================
export const ROOM_AVAILABILITY_DATA = {
  1: [ // Hotel ID 1 - DigiStay Mumbai
    { id: 101, type: 'Standard Double', status: 'occupied', guest: 'Arjun Singh', checkOut: '2026-04-05' },
    { id: 102, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
    { id: 103, type: 'Deluxe Suite', status: 'occupied', guest: 'Priya Sharma', checkOut: '2026-04-04' },
    { id: 104, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
    { id: 105, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
    { id: 201, type: 'Deluxe Suite', status: 'occupied', guest: 'Amit Patel', checkOut: '2026-04-08' },
    { id: 202, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
    { id: 203, type: 'Executive Suite', status: 'maintenance', guest: null, checkOut: null },
  ],
  2: [ // Hotel ID 2 - DigiStay Goa
    { id: 201, type: 'Deluxe Suite', status: 'occupied', guest: 'Aisha Khan', checkOut: '2026-04-06' },
    { id: 202, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
    { id: 203, type: 'Executive Suite', status: 'cleaning', guest: null, checkOut: null },
    { id: 204, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
    { id: 205, type: 'Deluxe Suite', status: 'occupied', guest: 'Ravi Verma', checkOut: '2026-04-07' },
  ],
  3: [ // Hotel ID 3 - DigiStay Bangalore
    { id: 301, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
    { id: 302, type: 'Executive Suite', status: 'occupied', guest: 'Devesh Kumar', checkOut: '2026-04-05' },
    { id: 303, type: 'Standard Double', status: 'available', guest: null, checkOut: null },
    { id: 304, type: 'Deluxe Suite', status: 'maintenance', guest: null, checkOut: null },
    { id: 305, type: 'Standard Double', status: 'occupied', guest: 'Esha Nair', checkOut: '2026-04-09' },
    { id: 306, type: 'Family Room', status: 'available', guest: null, checkOut: null },
  ]
};

// ============================================
// AVAILABLE HOTELS FOR AUDITING
// ============================================
export const AVAILABLE_HOTELS = [
  {
    id: 1,
    name: 'DigiStay Mumbai',
    city: 'Mumbai',
    totalRooms: 20,
    occupiedRooms: 12,
    availableRooms: 8,
    address: 'Plot No. 123, Business Complex, Mumbai, Maharashtra, 400001'
  },
  {
    id: 2,
    name: 'DigiStay Delhi',
    city: 'Delhi',
    totalRooms: 25,
    occupiedRooms: 15,
    availableRooms: 10,
    address: 'Plot No. 456, Business District, New Delhi, Delhi, 110001'
  },
  {
    id: 3,
    name: 'DigiStay Bangalore',
    city: 'Bangalore',
    totalRooms: 18,
    occupiedRooms: 10,
    availableRooms: 8,
    address: 'Plot No. 789, Tech Park, Bangalore, Karnataka, 560001'
  }
];

// ============================================
// RECEPTIONISTS DATA
// ============================================
export const DEFAULT_RECEPTIONISTS = [
  {
    id: 1,
    firstName: 'Raj',
    lastName: 'Kumar',
    email: 'raj.kumar@digistay.in',
    phone: '+91-9876543210',
    username: 'raj_kumar',
    status: 'active',
    joinDate: '2024-01-15',
    credentialsGenerated: true
  },
  {
    id: 2,
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@digistay.in',
    phone: '+91-9876543211',
    username: 'priya_sharma',
    status: 'active',
    joinDate: '2024-02-20',
    credentialsGenerated: true
  }
];

// ============================================
// BOOKINGS DATA - Uses dynamic dates from CURRENT_DATE
// ============================================
export const BOOKINGS_DATA = {
  [DATE_0]: [
    {
      id: 1,
      name: 'Rohit Nair',
      guests: 1,
      room: 205,
      checkInTime: '15:00',
      checkOutTime: formatDateBooking(addDays(CURRENT_DATE, 1)),
      phone: '+1 (555) 234-5678',
      email: 'rohit.nair@email.com',
      status: 'checked-in'
    },
    {
      id: 2,
      name: 'Akshara Reddy',
      guests: 3,
      room: 302,
      checkInTime: '16:00',
      checkOutTime: formatDateBooking(addDays(CURRENT_DATE, 2)),
      phone: '+1 (555) 345-6789',
      email: 'akshara.reddy@email.com',
      status: 'pending'
    }
  ],
  [DATE_1]: [
    {
      id: 3,
      name: 'Aditya Gupta',
      guests: 2,
      room: 101,
      checkInTime: '14:00',
      checkOutTime: formatDateBooking(addDays(CURRENT_DATE, 3)),
      phone: '+1 (555) 456-7890',
      email: 'aditya.gupta@email.com',
      status: 'pending'
    }
  ],
  [DATE_2]: [
    {
      id: 4,
      name: 'Meera Singh',
      guests: 4,
      room: 203,
      checkInTime: '13:00',
      checkOutTime: formatDateBooking(addDays(CURRENT_DATE, 5)),
      phone: '+1 (555) 567-8901',
      email: 'meera.singh@email.com',
      status: 'pending'
    },
    {
      id: 5,
      name: 'Vikram Desai',
      guests: 1,
      room: 104,
      checkInTime: '15:30',
      checkOutTime: formatDateBooking(addDays(CURRENT_DATE, 4)),
      phone: '+1 (555) 678-9012',
      email: 'vikram.desai@email.com',
      status: 'pending'
    }
  ]
};

// ============================================
// AUDITOR REPORTS DATA - Reports submitted by auditors
// ============================================
export const AUDIT_REPORTS_DATA = {
  1: [ // Hotel ID 1 - DigiStay Mumbai
    {
      id: 1,
      auditorName: 'Ankit Mehta',
      date: '2024-04-10',
      status: 'Completed',
      rooms: 15,
      issues: 2,
      notes: 'Minor issues found in Room 101 and 205. Resolved promptly.'
    },
    {
      id: 2,
      auditorName: 'Sara Patel',
      date: '2024-03-28',
      status: 'Completed',
      rooms: 15,
      issues: 0,
      notes: 'All rooms passed inspection. Excellent maintenance standards.'
    },
    {
      id: 3,
      auditorName: 'Manish Iyer',
      date: '2024-03-15',
      status: 'Completed',
      rooms: 15,
      issues: 1,
      notes: 'Room 308 needs carpet replacement. All other rooms are in good condition.'
    }
  ],
  2: [ // Hotel ID 2 - DigiStay Goa
    {
      id: 4,
      auditorName: 'Anjali Verma',
      date: '2024-04-05',
      status: 'Completed',
      rooms: 18,
      issues: 1,
      notes: 'AC unit needs servicing in Room 215.'
    },
    {
      id: 5,
      auditorName: 'Raj Kapoor',
      date: '2024-03-20',
      status: 'Completed',
      rooms: 18,
      issues: 0,
      notes: 'Perfect condition. All amenities working properly.'
    }
  ],
  3: [ // Hotel ID 3 - DigiStay Bangalore
    {
      id: 6,
      auditorName: 'Esha Nair',
      date: '2024-04-08',
      status: 'Completed',
      rooms: 20,
      issues: 3,
      notes: 'Issues in Rooms 302, 305, and 310. Maintenance team notified.'
    }
  ]
};

// ============================================
// PAYMENT REPORTS DATA - Payment transactions by hotel
// ============================================
export const PAYMENT_REPORTS_DATA = {
  1: [ // Hotel ID 1 - DigiStay Mumbai
    {
      id: 1001,
      guestName: 'Arjun Singh',
      bookingId: 'BK001',
      amount: 15800,
      date: '2026-04-15',
      time: '14:30',
      method: PaymentType.CREDIT_CARD,
      status: PaymentStatus.COMPLETED,
      referenceNo: 'REF-CC-001',
      notes: 'Payment successful via online portal'
    },
    {
      id: 1002,
      guestName: 'Priya Sharma',
      bookingId: 'BK002',
      amount: 23700,
      date: '2026-04-14',
      time: '10:15',
      method: PaymentType.BANK_TRANSFER,
      status: PaymentStatus.COMPLETED,
      referenceNo: 'REF-BT-002',
      notes: 'Direct bank transfer completed'
    },
    {
      id: 1003,
      guestName: 'Amit Patel',
      bookingId: 'BK003',
      amount: 13090,
      date: '2026-04-13',
      time: '09:45',
      method: PaymentType.DEBIT_CARD,
      status: PaymentStatus.PENDING,
      referenceNo: 'REF-DC-003',
      notes: 'Payment pending verification'
    },
    {
      id: 1004,
      guestName: 'Neha Gupta',
      bookingId: 'BK004',
      amount: 5000,
      date: '2026-04-12',
      time: '15:20',
      method: PaymentType.UPI,
      status: PaymentStatus.COMPLETED,
      referenceNo: 'REF-UPI-004',
      notes: 'UPI payment processed'
    },
    {
      id: 1005,
      guestName: 'Devesh Kumar',
      bookingId: 'BK005',
      amount: 7920,
      date: '2026-04-11',
      time: '11:00',
      method: PaymentType.CREDIT_CARD,
      status: PaymentStatus.FAILED,
      referenceNo: 'REF-CC-005',
      notes: 'Payment failed - card declined'
    }
  ],
  2: [ // Hotel ID 2 - DigiStay Goa
    {
      id: 2001,
      guestName: 'Aisha Khan',
      bookingId: 'BK201',
      amount: 26180,
      date: '2026-04-15',
      time: '16:00',
      method: PaymentType.CREDIT_CARD,
      status: PaymentStatus.COMPLETED,
      referenceNo: 'REF-CC-201',
      notes: 'Online payment completed'
    },
    {
      id: 2002,
      guestName: 'Ravi Verma',
      bookingId: 'BK202',
      amount: 19910,
      date: '2026-04-14',
      time: '13:30',
      method: PaymentType.BANK_TRANSFER,
      status: PaymentStatus.COMPLETED,
      referenceNo: 'REF-BT-202',
      notes: 'Bank transfer successful'
    },
    {
      id: 2003,
      guestName: 'Esha Nair',
      bookingId: 'BK203',
      amount: 8000,
      date: '2026-04-13',
      time: '12:45',
      method: PaymentType.WALLET,
      status: PaymentStatus.REFUNDED,
      referenceNo: 'REF-WL-203',
      notes: 'Refund processed to wallet'
    }
  ],
  3: [ // Hotel ID 3 - DigiStay Bangalore
    {
      id: 3001,
      guestName: 'Rohit Nair',
      bookingId: 'BK301',
      amount: 11990,
      date: '2026-04-15',
      time: '10:00',
      method: PaymentType.DEBIT_CARD,
      status: PaymentStatus.COMPLETED,
      referenceNo: 'REF-DC-301',
      notes: 'Debit card payment successful'
    },
    {
      id: 3002,
      guestName: 'Akshara Reddy',
      bookingId: 'BK302',
      amount: 19910,
      date: '2026-04-14',
      time: '14:20',
      method: PaymentType.UPI,
      status: PaymentStatus.COMPLETED,
      referenceNo: 'REF-UPI-302',
      notes: 'UPI payment processed'
    },
    {
      id: 3003,
      guestName: 'Aditya Gupta',
      bookingId: 'BK303',
      amount: 9900,
      date: '2026-04-13',
      time: '11:30',
      method: PaymentType.CREDIT_CARD,
      status: PaymentStatus.PENDING,
      referenceNo: 'REF-CC-303',
      notes: 'Payment under verification'
    },
    {
      id: 3004,
      guestName: 'Meera Singh',
      bookingId: 'BK304',
      amount: 20900,
      date: '2026-04-16',
      time: '15:45',
      method: PaymentType.BANK_TRANSFER,
      status: PaymentStatus.COMPLETED,
      referenceNo: 'REF-BT-304',
      notes: 'Bank transfer completed'
    }
  ]
};

// ============================================
// UTILITY FUNCTION: Get hotels data with initial state setup
// ============================================
export function getInitialHotelsData() {
  return deepCopy(HOTELS_DATA);
}

export function getInitialRececeptionistsData() {
  return deepCopy(DEFAULT_RECEPTIONISTS);
}
