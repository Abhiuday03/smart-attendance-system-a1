import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import AuthShell from '@/components/shared/AuthShell'
import { Input, Label } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@university.edu')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { loginAdmin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      loginAdmin(email)
      toast.success('Welcome back, Admin')
      setLoading(false)
      navigate('/admin/dashboard')
    }, 700)
  }

  return (
    <AuthShell
      title="Admin sign in"
      description="Manage students, sessions, and reports for your institution."
      footer={<>Are you a student? <Link to="/student/login" className="font-medium text-primary hover:underline">Sign in here</Link></>}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Institution email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" required className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@university.edu" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/admin/forgot-password" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" type={showPassword ? 'text' : 'password'} required className="pl-9 pr-9" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New institution? <Link to="/admin/signup" className="font-medium text-primary hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  )
}
