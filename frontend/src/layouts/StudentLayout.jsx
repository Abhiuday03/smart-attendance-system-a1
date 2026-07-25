import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, User, Bell, Sparkles, LogOut, HelpCircle, Settings } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { Avatar } from '@/components/ui/Misc'
import { studentNotifications } from '@/mock/misc'
import { toast } from 'sonner'
import { cn } from '@/utils/cn'
import { Moon, Sun } from 'lucide-react'

const navItems = [
  { to: '/student/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/student/attendance', label: 'History', icon: CalendarDays },
  { to: '/student/notifications', label: 'Alerts', icon: Bell },
  { to: '/student/profile', label: 'Profile', icon: User },
]

export default function StudentLayout() {
  const { studentUser, logoutStudent } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const unread = studentNotifications.filter((n) => !n.read).length

  const handleLogout = () => {
    logoutStudent()
    toast.success('Logged out successfully')
    navigate('/student/login')
  }

  return (
    <div className="min-h-screen bg-background lg:flex">
      {/* Desktop rail */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card lg:flex lg:sticky lg:top-0 lg:h-screen">
        <div className="flex h-16 items-center gap-2 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <span className="font-display font-semibold">AttendAI</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )
              }
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/student/settings"
            className={({ isActive }) =>
              cn('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground')
            }
          >
            <Settings className="h-4.5 w-4.5" /> Settings
          </NavLink>
          <NavLink
            to="/student/help"
            className={({ isActive }) =>
              cn('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground')
            }
          >
            <HelpCircle className="h-4.5 w-4.5" /> Help
          </NavLink>
        </nav>
        <button onClick={handleLogout} className="m-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10">
          <LogOut className="h-4.5 w-4.5" /> Log out
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile-first top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md lg:h-16 lg:px-6">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display font-semibold text-sm">AttendAI</span>
          </div>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted">
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
            <NavLink to="/student/notifications" className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted">
              <Bell className="h-4.5 w-4.5" />
              {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />}
            </NavLink>
            <NavLink to="/student/profile">
              <Avatar name={studentUser?.name} size={32} />
            </NavLink>
          </div>
        </header>

        <main className="flex-1 px-4 pb-24 pt-4 lg:px-6 lg:pb-6 lg:pt-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-card/95 py-2 backdrop-blur-md lg:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn('flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground')
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
