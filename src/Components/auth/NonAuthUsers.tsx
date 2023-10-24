/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Outlet, useNavigate } from 'react-router'
import { useGetCurrentUser } from '../../utils/hooks'
import { useEffect } from 'react'

export function NonAuthUsers (): any {
  const { user } = useGetCurrentUser()

  const navigate = useNavigate()
  useEffect(() => {
    if (user) navigate('/')
  }, [user])
  if (user === null) return <Outlet></Outlet>
}
