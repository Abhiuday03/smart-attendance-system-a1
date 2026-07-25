import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, KeyRound } from 'lucide-react'
import AuthShell from '@/components/shared/AuthShell'
import { Input, Label } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export function ForgotPasswordScreen({ loginPath, otpPath, roleLabel }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success(`OTP sent to ${email}`)
      setLoading(false)
      navigate(otpPath)
    }, 700)
  }

  return (
    <AuthShell
      title="Forgot password"
      description={`Enter your ${roleLabel} email and we'll send a one-time code to reset it.`}
      footer={<Link to={loginPath} className="font-medium text-primary hover:underline">Back to sign in</Link>}
    >
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" required className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Sending code…' : 'Send reset code'}
        </Button>
      </form>
    </AuthShell>
  )
}

export function OtpScreen({ loginPath, resetPath, roleLabel, dashboardPath }) {
  const [values, setValues] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const refs = useRef([])
  const navigate = useNavigate()

  const handleChange = (i, v) => {
    if (!/^\d?$/.test(v)) return
    const next = [...values]
    next[i] = v
    setValues(next)
    if (v && i < 5) refs.current[i + 1]?.focus()
  }

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success('Code verified')
      setLoading(false)
      navigate(resetPath || dashboardPath)
    }, 700)
  }

  return (
    <AuthShell
      title="Verify your identity"
      description={`Enter the 6-digit code sent to your ${roleLabel} email.`}
      footer={<Link to={loginPath} className="font-medium text-primary hover:underline">Back to sign in</Link>}
    >
      <form className="space-y-5" onSubmit={submit}>
        <div className="flex justify-between gap-2">
          {values.map((v, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={v}
              onChange={(e) => handleChange(i, e.target.value)}
              maxLength={1}
              inputMode="numeric"
              className="h-12 w-11 rounded-lg border border-border bg-card text-center text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-12"
            />
          ))}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Verifying…' : 'Verify code'}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Didn't get a code? <button type="button" onClick={() => toast.success('Code resent')} className="font-medium text-primary hover:underline">Resend</button>
        </p>
      </form>
    </AuthShell>
  )
}

export function ResetPasswordScreen({ loginPath }) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success('Password reset successfully')
      setLoading(false)
      navigate(loginPath)
    }, 700)
  }

  return (
    <AuthShell title="Set a new password" description="Choose a strong password you haven't used before." footer={<Link to={loginPath} className="font-medium text-primary hover:underline">Back to sign in</Link>}>
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <Label htmlFor="password">New password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" type="password" required className="pl-9" placeholder="••••••••" />
          </div>
        </div>
        <div>
          <Label htmlFor="confirm">Confirm password</Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="confirm" type="password" required className="pl-9" placeholder="••••••••" />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Updating…' : 'Update password'}
        </Button>
      </form>
    </AuthShell>
  )
}
