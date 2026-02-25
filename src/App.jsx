import { useState } from 'react'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import Toast from './components/ui/Toast'
import { useToast } from './hooks/useToast'

export default function App() {
  const [user, setUser]     = useState(null)
  const { toasts, addToast } = useToast()

  const handleLogin  = (userData) => setUser(userData)
  const handleLogout = () => {
    setUser(null)
    addToast('Logged out successfully', 'info')
  }

  return (
    <>
      <Toast toasts={toasts} />

      {user ? (
        <DashboardPage
          user={user}
          onLogout={handleLogout}
          addToast={addToast}
        />
      ) : (
        <AuthPage
          onLogin={handleLogin}
          addToast={addToast}
        />
      )}
    </>
  )
}
