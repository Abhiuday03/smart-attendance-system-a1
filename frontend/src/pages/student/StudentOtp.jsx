import { OtpScreen } from '@/components/shared/AuthFlows'
export default function StudentOtp() {
  return <OtpScreen loginPath="/student/login" dashboardPath="/student/login" roleLabel="student" />
}
