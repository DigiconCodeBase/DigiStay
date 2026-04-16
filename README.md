# 🏨 Hotel Reception Booking System

A modern React-based hotel reception and check-in booking screen for the DigiStay Hotels management system.

## Features

✨ **Guest Information Collection**
- Personal details form (first name, last name, email, phone)
- Check-in and check-out date selection
- Number of guests selection
- Form validation with error messages

🛏️ **Room Selection**
- Dynamic room filtering based on guest capacity
- Four room types: Standard, Deluxe, Suite, Family
- Detailed room information with amenities
- Real-time price display

💰 **Booking Summary**
- Complete booking overview
- Guest information review
- Room details and amenities
- Price breakdown with tax calculation
- Final confirmation step

## Project Structure

```
src/
├── components/
│   ├── HotelReceptionScreen.jsx       # Main container component
│   ├── HotelReceptionScreen.css
│   ├── BookingForm.jsx                # Guest information form
│   ├── BookingForm.css
│   ├── RoomSelection.jsx              # Room selection UI
│   ├── RoomSelection.css
│   ├── BookingSummary.jsx             # Booking review & confirmation
│   └── BookingSummary.css
├── App.jsx
├── App.css
├── main.jsx
├── index.css
└── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Usage

1. **Fill Guest Information**: Enter personal details and select dates
2. **Select Room**: Choose from available rooms suitable for your guest count
3. **Review Booking**: Check the summary and confirm the booking
4. **Complete**: Receive confirmation via email

## Room Types

| Type | Capacity | Price | Features |
|------|----------|-------|----------|
| Standard | 2 guests | $99/night | WiFi, TV, AC |
| Deluxe | 3 guests | $149/night | WiFi, Smart TV, Mini Bar |
| Suite | 4 guests | $249/night | Luxury amenities, Jacuzzi |
| Family | 5 guests | $199/night | Multiple bathrooms, Kitchen |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and animations

## License

© 2024 DigiStay Hotels - All rights reserved
