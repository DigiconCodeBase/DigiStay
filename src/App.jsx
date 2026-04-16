import { useSelector, useDispatch } from 'react-redux'
import LoginScreen from './components/auth/LoginScreen'
import HotelReceptionScreen from './components/reception/HotelReceptionScreen'
import OwnerScreen from './components/owner/OwnerScreen'
import AuditorScreen from './components/auditor/AuditorScreen'
import { UserRole } from './components/common/enums'
import { logout, switchScreen } from './redux/authSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { isLoggedIn, userRole, currentScreen } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleSwitchScreen = (role) => {
    dispatch(switchScreen(role))
  }

  if (!isLoggedIn) {
    return <LoginScreen />
  }

  return (
    <>
      {currentScreen === UserRole.RECEPTIONIST && (
        <HotelReceptionScreen 
          onSwitchToOwner={() => handleSwitchScreen(UserRole.OWNER)}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === UserRole.OWNER && (
        <OwnerScreen 
          onSwitchToReception={() => handleSwitchScreen(UserRole.RECEPTIONIST)}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === UserRole.AUDITOR && (
        <AuditorScreen onLogout={handleLogout} />
      )}
      <footer className="app-footer">
        <p>© 2024 DigiStay Hotels - Owner Management System</p>
      </footer>
    </>
  )
}

export default App
