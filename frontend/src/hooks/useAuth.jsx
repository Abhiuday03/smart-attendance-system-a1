import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => {
    const stored = sessionStorage.getItem('mock_admin_user')
    return stored ? JSON.parse(stored) : null
  })
  const [studentUser, setStudentUser] = useState(() => {
    const stored = sessionStorage.getItem('mock_student_user')
    return stored ? JSON.parse(stored) : null
  })

  const loginAdmin = useCallback((email) => {
    const user = { name: 'Admin User', email, role: 'admin', institution: 'Nova Institute of Technology' }
    sessionStorage.setItem('mock_admin_user', JSON.stringify(user))
    setAdminUser(user)
  }, [])

  const loginStudent = useCallback((email) => {
    const user = { name: 'Aarav Sharma', email, role: 'student', rollNumber: 'CSE3A001' }
    sessionStorage.setItem('mock_student_user', JSON.stringify(user))
    setStudentUser(user)
  }, [])

  const logoutAdmin = useCallback(() => {
    sessionStorage.removeItem('mock_admin_user')
    setAdminUser(null)
  }, [])

  const logoutStudent = useCallback(() => {
    sessionStorage.removeItem('mock_student_user')
    setStudentUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ adminUser, studentUser, loginAdmin, loginStudent, logoutAdmin, logoutStudent }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
