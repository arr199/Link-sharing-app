import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

// AUTH COMPONENT
import { AuthProvider } from './components/auth/AuthProvider'
// COMPONENTS
import { NoPage } from './components/pages/Nopage'
import { Home } from './components/pages/Home'
import { Links } from './components/layout/Links'
import { LoginPage } from './components/pages/LoginPage'
import { SignUp } from './components/pages/SignUp'
import { ProfileDetails } from './components/layout/ProfileDetails'
import { Preview } from './components/pages/Preview'
import { Layout } from './components/Layout'
import { NonAuthUsers } from './components/auth/NonAuthUsers'
import { AuthUsers } from './components/auth/AuthUsers'

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
