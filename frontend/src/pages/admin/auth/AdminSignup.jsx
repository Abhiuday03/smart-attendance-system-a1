import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '@/components/shared/AuthShell'
import { Input, Label } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export default function AdminSignup() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success('Account created — verify your email to continue')
      setLoading(false)
      navigate('/admin/login')
    }, 800)
  }

  return (
    <AuthShell
      title="Create your institution account"
      description="Set up AttendAI for your college or university in minutes."
      footer={<>Already have an account? <Link to="/admin/login" className="font-medium text-primary hover:underline">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="institution">Institution name</Label>
          <Input id="institution" required placeholder="Nova Institute of Technology" />
        </div>
        <div>
          <Label htmlFor="name">Your full name</Label>
          <Input id="name" required placeholder="Admin User" />
        </div>
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" required placeholder="admin@university.edu" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required placeholder="Create a strong password" />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </AuthShell>
  )
}
