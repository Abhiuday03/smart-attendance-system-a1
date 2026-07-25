import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

// Fake auth guard — checks mock session only. Swap for real auth later.
export default function AdminGuard() {
  const { adminUser } = useAuth()
  if (!adminUser) return <Navigate to="/admin/login" replace />
  return <Outlet />
}
