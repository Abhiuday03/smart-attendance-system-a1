import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '@/components/shared/AdminSidebar'
import Topbar from '@/components/shared/Topbar'
import { useAuth } from '@/hooks/useAuth'
import { notifications } from '@/mock/misc'
import { toast } from 'sonner'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { adminUser, logoutAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutAdmin()
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          user={adminUser}
          notifications={notifications}
          onLogout={handleLogout}
          profileHref="/admin/settings"
          settingsHref="/admin/settings"
        />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
