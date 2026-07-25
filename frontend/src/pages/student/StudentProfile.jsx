import { Mail, Phone, MapPin, ScanFace, Pencil, CheckCircle2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { Avatar, Progress } from '@/components/ui/Misc'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

export default function StudentProfile() {
  const { studentUser } = useAuth()

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">Profile</h1>
        <p className="text-sm text-muted-foreground">Your personal details and face registration status.</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <Avatar name={studentUser?.name} size={72} />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{studentUser?.name}</h2>
            <p className="text-sm text-muted-foreground">{studentUser?.rollNumber} · CSE, 3rd Year, Section A</p>
          </div>
          <Button variant="outline" size="sm"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
        </div>
        <div className="mt-6 grid gap-3 border-t border-border pt-5 sm:grid-cols-3">
          <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" /> {studentUser?.email}</div>
          <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" /> +91 98765 43210</div>
          <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /> Hyderabad, India</div>
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle>Face registration</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
              <ScanFace className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">Face profile active</p>
                <Badge variant="success"><CheckCircle2 className="h-3 w-3" /> Verified</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Last updated Jul 10, 2026 · Confidence 96.4%</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast.info('Camera would open here to re-scan')}>Re-scan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Profile completion</CardTitle></CardHeader>
        <CardContent>
          <Progress value={92} />
          <p className="mt-2 text-xs text-muted-foreground">92% complete — add your guardian's phone number to finish.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Guardian details</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div><Label htmlFor="gname">Guardian name</Label><Input id="gname" defaultValue="Rajesh Sharma" /></div>
          <div><Label htmlFor="gphone">Guardian phone</Label><Input id="gphone" placeholder="Add phone number" /></div>
          <div className="sm:col-span-2 flex justify-end">
            <Button onClick={() => toast.success('Profile updated')}>Save changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
