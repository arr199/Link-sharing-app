/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../utils/API'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { useEffect, useState, createContext } from 'react'

export const AuthContext = createContext<{
  user: User | null | false
  setUser: React.Dispatch<React.SetStateAction<User | null | false>>
}>({ user: false, setUser: () => {} })
export function AuthProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null | false>(false)

  initializeApp(firebaseConfig)
  // CHECK IF THE USER EXIST THROUGHOUT THE APPLICATION
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
