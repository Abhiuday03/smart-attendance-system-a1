import { useCallback, useState } from 'react'
import { FileSpreadsheet, FileText, File, UploadCloud, CheckCircle2, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Misc'
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/Table'
import { StatusChip } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Controls'
import { bulkUploadHistory } from '@/mock/students'
import { toast } from 'sonner'

const formats = [
  { label: 'CSV', ext: '.csv', icon: FileSpreadsheet },
  { label: 'Excel', ext: '.xlsx, .xls', icon: FileSpreadsheet },
  { label: 'PDF', ext: '.pdf', icon: FileText },
  { label: 'Word', ext: '.doc, .docx', icon: File },
]

export default function BulkUpload() {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState(null)

  const simulateUpload = useCallback((name) => {
    setFileName(name)
    setUploading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setUploading(false)
          toast.success(`${name} processed — students extracted and registered`)
          return 100
        }
        return p + 14
      })
    }, 250)
  }, [])

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) simulateUpload(file.name)
  }

  const handleSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) simulateUpload(file.name)
  }

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/admin/dashboard' }, { label: 'Students', href: '/admin/students' }, { label: 'Bulk upload' }]} />
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Bulk upload students</h1>
        <p className="text-sm text-muted-foreground">Upload a roster and student records will be extracted and registered automatically.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
                dragging ? 'border-primary bg-accent' : 'border-border'
              }`}
            >
              {!uploading && progress !== 100 && (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <UploadCloud className="h-7 w-7" />
                  </div>
                  <p className="font-medium">Drag & drop your student sheet here</p>
                  <p className="text-sm text-muted-foreground">or</p>
                  <label>
                    <input type="file" accept=".csv,.xlsx,.xls,.pdf,.doc,.docx" className="hidden" onChange={handleSelect} />
                    <span className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                      Browse files
                    </span>
                  </label>
                </>
              )}
              {uploading && (
                <div className="w-full max-w-sm">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-3 truncate text-sm font-medium">{fileName}</p>
                  <Progress value={progress} className="mt-2" />
                  <p className="mt-1 text-xs text-muted-foreground">Extracting student records… {progress}%</p>
                </div>
              )}
              {!uploading && progress === 100 && (
                <div>
                  <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
                  <p className="mt-3 font-medium">{fileName} processed successfully</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => { setProgress(0); setFileName(null) }}>Upload another file</Button>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {formats.map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-border p-3 text-center">
                  <f.icon className="h-5 w-5 text-primary" />
                  <p className="text-xs font-medium">{f.label}</p>
                  <p className="text-[10px] text-muted-foreground">{f.ext}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>What happens next</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            {[
              'Names, roll numbers, and contact details are parsed from your file.',
              'Duplicate or malformed rows are flagged for manual review.',
              'Valid students are registered and appear in the Students list.',
              'Face registration is requested from each student on next login.',
            ].map((step, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground">{i + 1}</span>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Upload history</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <THead>
              <TR><TH>File</TH><TH>Type</TH><TH>Uploaded</TH><TH>Rows</TH><TH>Registered</TH><TH>Failed</TH><TH>Status</TH></TR>
            </THead>
            <TBody>
              {bulkUploadHistory.map((u) => (
                <TR key={u.id}>
                  <TD className="font-medium text-foreground">{u.fileName}</TD>
                  <TD>{u.type}</TD>
                  <TD className="text-xs text-muted-foreground">{u.uploadedOn}</TD>
                  <TD>{u.totalRows}</TD>
                  <TD className="text-success font-medium">{u.registered}</TD>
                  <TD className="text-destructive font-medium">{u.failed}</TD>
                  <TD><StatusChip status={u.status === 'completed' ? 'active' : 'pending'} label={u.status} /></TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
