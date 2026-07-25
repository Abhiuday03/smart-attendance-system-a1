import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ScanFace, UserPlus } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input, Label } from '@/components/ui/Input'
import { Select } from '@/components/ui/Controls'
import { Button } from '@/components/ui/Button'
import { Breadcrumb } from '@/components/ui/Controls'
import { toast } from 'sonner'

export default function StudentRegister() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success('Student registered — face enrollment pending')
      setLoading(false)
      navigate('/admin/students')
    }, 800)
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/admin/dashboard' }, { label: 'Students', href: '/admin/students' }, { label: 'Register' }]} />
      <Link to="/admin/students" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to students
      </Link>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Register a new student</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required placeholder="Ananya Reddy" />
              </div>
              <div>
                <Label htmlFor="roll">Roll number</Label>
                <Input id="roll" required placeholder="CSE3A045" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="ananya.reddy@university.edu" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" required placeholder="+91 90000 00000" />
              </div>
              <div>
                <Label>Department</Label>
                <Select placeholder="Select department" options={[{ value: 'CSE', label: 'CSE' }, { value: 'ECE', label: 'ECE' }, { value: 'MECH', label: 'MECH' }, { value: 'CIVIL', label: 'CIVIL' }, { value: 'IT', label: 'IT' }]} />
              </div>
              <div>
                <Label>Year</Label>
                <Select placeholder="Select year" options={[{ value: '1', label: '1st Year' }, { value: '2', label: '2nd Year' }, { value: '3', label: '3rd Year' }, { value: '4', label: '4th Year' }]} />
              </div>
              <div>
                <Label htmlFor="guardian">Guardian name</Label>
                <Input id="guardian" placeholder="Parent / guardian name" />
              </div>
              <div>
                <Label htmlFor="guardianPhone">Guardian phone</Label>
                <Input id="guardianPhone" placeholder="+91 90000 00000" />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <Link to="/admin/students"><Button type="button" variant="outline">Cancel</Button></Link>
                <Button type="submit" disabled={loading}>
                  <UserPlus className="h-4 w-4" /> {loading ? 'Registering…' : 'Register student'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader><CardTitle>Face registration</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <ScanFace className="h-7 w-7" />
              </div>
              <p className="text-sm font-medium">Face capture will begin after registration</p>
              <p className="text-xs text-muted-foreground">The student completes a guided scan on their next login, or staff can capture it now on a connected device.</p>
              <Button variant="outline" size="sm" onClick={() => toast.info('Camera capture is connected to hardware later')}>Capture now</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
