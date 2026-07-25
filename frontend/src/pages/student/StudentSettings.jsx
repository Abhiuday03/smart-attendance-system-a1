import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Switch } from '@/components/ui/Misc'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { useTheme } from '@/hooks/useTheme'
import { Moon, Sun } from 'lucide-react'
import { toast } from 'sonner'

export default function StudentSettings() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            Dark mode
          </div>
          <Switch checked={theme === 'dark'} onChange={toggleTheme} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Notification preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {['Low attendance alerts', 'Session reminders', 'Weekly summary email'].map((label, i) => (
            <div key={label} className="flex items-center justify-between">
              <p className="text-sm">{label}</p>
              <Switch checked={i !== 2} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Change password</CardTitle></CardHeader>
        <CardContent className="space-y-4 max-w-sm">
          <div><Label htmlFor="current">Current password</Label><Input id="current" type="password" /></div>
          <div><Label htmlFor="new">New password</Label><Input id="new" type="password" /></div>
          <Button onClick={() => toast.success('Password updated')}>Update password</Button>
        </CardContent>
      </Card>
    </div>
  )
}
