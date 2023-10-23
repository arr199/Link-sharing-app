import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

// AUTH COMPONENT
import { AuthProvider } from './Components/AuthProvider'
// COMPONENTS
import { NoPage } from './Components/Nopage'
import { Home } from './Components/Home'
import { Links } from './Components/Links'
import { LoginPage } from './Components/LoginPage'
import { SignUp } from './Components/SignUp'
import { ProfileDetails } from './Components/ProfileDetails'
import { Preview } from './Components/Preview'
import { Layout } from './Components/Layout'
import { NonAuthUsers } from './Components/NonAuthUsers'
import { AuthUsers } from './Components/AuthUsers'

export function Router (): JSX.Element {
  const router = createBrowserRouter(createRoutesFromElements(
      <>
          <Route path='/' element={<Layout></Layout>}>
             {/* Auth users */}
              <Route element={<AuthUsers></AuthUsers> }>
                <Route element={<Home></Home>} >
                  <Route index element={<Links></Links>}/>
                  <Route path='profile' element={<ProfileDetails/>}/>
                </Route>
              </Route>

              {/* NonAuthUser */}
            <Route element={<NonAuthUsers></NonAuthUsers>} >
                <Route path='login' element={<LoginPage></LoginPage>} />
                <Route path='signup' element={<SignUp></SignUp>}/>
            </Route>
             
              {/* preview page */}
              <Route path='/preview/:id' element={<Preview/>} />
              {/* page not found */}
              <Route path='*' element={<NoPage></NoPage>}></Route>
          </Route>

      </>
  ))

  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  )
}
