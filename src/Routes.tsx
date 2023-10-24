import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

// AUTH COMPONENT
import { AuthProvider } from './auth/AuthProvider'
// COMPONENTS
import { NoPage } from './pages/Nopage'
import { Home } from './pages/Home'
import { Links } from './layout/Links'
import { LoginPage } from './pages/LoginPage'
import { SignUp } from './pages/SignUp'
import { ProfileDetails } from './layout/ProfileDetails'
import { Preview } from './pages/Preview'
import { Layout } from './components/Layout'
import { NonAuthUsers } from './auth/NonAuthUsers'
import { AuthUsers } from './auth/AuthUsers'

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
