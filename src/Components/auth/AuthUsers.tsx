/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Outlet, useNavigate } from 'react-router'
import { useGetCurrentUser } from '../../utils/hooks'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../Layout'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../utils/API'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export function AuthUsers (): JSX.Element | undefined {
  const { user } = useGetCurrentUser()
  const { setPersonalInfo, setLinks } = useContext(GlobalContext)

  const navigate = useNavigate()
  // WHEN THE USER IS IN AN AUTHENTICATED ROUTE WE GET
  // THE SPECIFIC USER DATA FROM FIREBASE

  useEffect(() => {
    if (user === null) {
      navigate('/login')
      return
    }
    if (user) {
      async function getLinksData (): Promise<void> {
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setLinks(docSnap.data().links)
        } else {
          setLinks([])
        }
      }
      async function getPersonalInfoData (): Promise<void> {
        const docRef = doc(db, 'users', user.uid)
        const snapshot = await getDoc(docRef)
        if (snapshot.exists()) {
          setPersonalInfo(snapshot.data().personalInfo)
        } else {
          setPersonalInfo({ firstName: '', lastName: '', email: '', imgUrl: '' })
        }
      }
      getPersonalInfoData().catch(err => { console.log('ERROR : Get Personal Info Data :  ', err) })
      getLinksData().catch(err => {
        console.log('ERROR : Get Link Data :  ', err)
      })
    }
  }, [user])

  if (user) return <Outlet></Outlet>
}
