import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ScanFace, ShieldCheck, Zap } from 'lucide-react'

export default function AuthShell({ title, description, children, footer }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex scan-grid">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/70" />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-semibold">AttendAI</span>
        </Link>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative max-w-md">
          <h2 className="font-display text-3xl font-semibold leading-tight">Face recognition attendance, built for real classrooms.</h2>
          <div className="mt-8 space-y-4">
            {[
              { icon: ScanFace, text: '97.8% recognition accuracy across live sessions' },
              { icon: Zap, text: 'Attendance marked in under 10 seconds per class' },
              { icon: ShieldCheck, text: 'Encrypted face embeddings, role-based access' },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                  <f.icon className="h-4 w-4" />
                </div>
                {f.text}
              </div>
            ))}
          </div>
        </motion.div>
        <p className="relative text-xs text-white/70">© 2026 AttendAI — Smart Attendance Management System</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <span className="font-display text-lg font-semibold">AttendAI</span>
          </Link>
          <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
          <div className="mt-7">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  )
}
