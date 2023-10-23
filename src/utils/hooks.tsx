import { useContext } from 'react'
import { AuthContext } from '../Components/AuthProvider'

//   USE THE GLOBAL AUTHENTICATION CONTEXT WITH THIS HOOK
export function useGetCurrentUser (): any {
  const { user, setUser } = useContext(AuthContext)
  return { user, setUser }
}
