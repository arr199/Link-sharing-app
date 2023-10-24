import { Outlet } from 'react-router'
import { Header } from '../layout/Header'
import { Phone } from '../layout/Phone'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../utils/API'

initializeApp(firebaseConfig)

export function Home (): JSX.Element {
  return (
      <>
          <Header></Header>
          <main className='flex  px-4  gap-6  min-h-screen'>
                  <Phone></Phone>
                  <Outlet></Outlet>
          </main>
      </>
  )
}
