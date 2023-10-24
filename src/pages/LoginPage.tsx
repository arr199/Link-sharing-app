import { MdEmail } from 'react-icons/md'
import { AiFillLock } from 'react-icons/ai'
import { NavLink, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseConfig } from '../utils/API'
import { FcGoogle } from 'react-icons/fc'
import { initializeApp } from 'firebase/app'

// Initialize Firebase
initializeApp(firebaseConfig)
const auth = getAuth()
const provider = new GoogleAuthProvider()
export function LoginPage (): JSX.Element {
  const [formData, setFormData] = useState<FormDataLogin>({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmitData (e: React.FormEvent): void {
    setLoading(true)
    e.preventDefault()

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        navigate('/')
      }).catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  function handleGoogleSignIn (): void {
    setLoading(true)
    signInWithPopup(auth, provider)
      .then(() => {
        navigate('/')
      }).catch((error) => {
        const errorMessage = error.message
        console.log(errorMessage)
      }).finally(() => { setLoading(false) })
  }

  return (
        <>   <section className="flex flex-col  items-center h-screen  gap-10 text-[#333333] max-w-[400px] mx-auto">
                <img className="mt-20" src="/images/logo-devlinks-large.svg" alt='devlinks logo'/>
                <form onChange={() => { setError('') }} onSubmit={handleSubmitData} className="bg-white flex flex-col p-10 gap-2 rounded-lg hover:[&>div>input]:border-[#8b76e0] focus:[&>div>input]:border-[#8b76e0]">
                  <h1 className="text-2xl font-bold ">Login</h1>

                  <p className="text-[#737373]">Add your details below to get back into the app</p>
                  {/* ERROR CONTAINER */}
                  <div className='relative  text-red-500 flex '>
                      {error.length > 0 && <span className='text-[14px]'>{error.replace('Firebase:', '')}</span> }
                  </div>
                  {/* EMAIL */}
                  <div className="flex flex-col mt-6 relative gap-1">
                      <span className="text-[14px]">Email address</span>
                      <input value={formData?.email} onChange={(e) => { setFormData({ ...formData, email: (e.target as HTMLInputElement).value }) }}
                      className="box-shadow border-[#D9D9D9] border-[2px] p-2 rounded-lg outline-none pl-8" placeholder='john@gmail.com' type='email'/>
                      <MdEmail className="absolute w-4 h-4 top-10 left-2 text-[#737373]"></MdEmail>
                  </div>
                   {/* PASSWORD */}
                  <div className="flex flex-col relative mt-4 gap-1">
                      <span className="text-[14px]">Password</span>
                      <input value={formData?.password} onChange={(e) => { setFormData({ ...formData, password: (e.target as HTMLInputElement).value }) }}
                      className="box-shadow border-[#D9D9D9] border-[2px] p-2 rounded-lg outline-none pl-8 " placeholder='Enter your password' type='password'/>
                      <AiFillLock className="absolute w-4 h-4 top-10 left-2 text-[#737373]"></AiFillLock>
                  </div>
                  <button disabled={ formData.email.length < 1 || formData.password.length < 1 }
                   className={` disabled:bg-red-300  text-white py-2 rounded-lg mt-4  font-medium ${loading ? ' bg-[#8e76f0] ' : 'bg-[#633CFF] hover:bg-[#7456eb]'}`}> {loading ? 'Logging In...' : 'Login' }</button>
                  {/* GOOGLE */}
                  <button onClick={handleGoogleSignIn}
                  className='flex items-center border py-2 gap-2 font-bold justify-center rounded-lg mt-4 mb-4 hover:bg-[#dddddd]' type='button'>Sign in with Google <FcGoogle className="w-6 h-6 "></FcGoogle></button>
                  <span className='text-center'>Don’t have an account? <NavLink to="/signup"> <span className='text-[#633CFF]'>Create account</span></NavLink></span>
                </form>
             </section>

        </>
  )
}
