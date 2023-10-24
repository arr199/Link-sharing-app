import { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { AiFillLock } from 'react-icons/ai'
import { NavLink, useNavigate } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../utils/API'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

initializeApp(firebaseConfig)

export function SignUp (): JSX.Element {
  const [formData, setFormData] = useState<FormDataSignUp>({ email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmitData (e: React.FormEvent): void {
    e.preventDefault()
    setLoading(true)
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        setError(err.message)
      }).finally(() => {
        setLoading(false)
      })
  }
  return (
        <>   <section className="flex flex-col  items-center h-screen  gap-10 text-[#333333]  mx-auto max-w-[400px]">
                <img className="mt-20" src="/images/logo-devlinks-large.svg" alt="devlinks logo"/>
                <form onChange={() => { setError('') } } onSubmit={handleSubmitData} className="bg-white w-full flex flex-col p-10 gap-2 rounded-lg
                 hover:[&>div>input]:border-[#8b76e0] focus:[&>div>input]:border-[#8b76e0]">
                  <h1 className="text-2xl font-bold ">Create account</h1>
                  <p className="text-[#737373]">Let’s get you started sharing your links!</p>
                  <div className='relative  text-red-500 flex '>
                      {error.length > 0 && <span className='text-[14px]'>{error.replace('Firebase:', '')} </span> }
                  </div>
                  {/* EMAIL */}
                  <div className="flex flex-col mt-6 relative gap-1">
                      <span className="text-[14px]">Email address</span>
                      <input value={formData.email} onChange={ e => { setFormData({ ...formData, email: e.target.value }) } }
                      className="box-shadow border-[#D9D9D9] border-[2px] p-2 rounded-lg outline-none pl-8 "
                      placeholder='john@gmail.com' type='email'/>
                      <MdEmail className="absolute w-4 h-4 top-10 left-2 text-[#737373]"></MdEmail>
                  </div>
                  {/* CREATE PASSWORD */}
                  <div className="flex flex-col relative mt-4 gap-1">
                      <span className="text-[14px]">Create password</span>
                      <input value={formData.password} onChange={ e => { setFormData({ ...formData, password: e.target.value }) }}
                      className="box-shadow border-[#D9D9D9] border-[2px] p-2 rounded-lg outline-none pl-8 " placeholder='At least 8 characters' type='password'/>
                      <AiFillLock className="absolute w-4 h-4 top-10 left-2 text-[#737373]"></AiFillLock>
                  </div>
                  {/* CONFIRM PASSWORD */}
                  <div className="flex flex-col relative mt-4 gap-1">
                      <span className="text-[14px]">Confirm password</span>
                      <input value={formData.confirmPassword} onChange={ e => { setFormData({ ...formData, confirmPassword: e.target.value }) }}
                      className="box-shadow border-[#D9D9D9] border-[2px] p-2 rounded-lg outline-none pl-8 " placeholder='At least 8 characters' type='password'/>
                      <AiFillLock className="absolute w-4 h-4 top-10 left-2 text-[#737373]"></AiFillLock>
                  </div>
                 {/* CREATE ACCOUNT BUTTON */}
                  <button disabled={ formData.email.length < 1 || formData.password.length < 1 || formData.confirmPassword.length < 1 || formData.password !== formData.confirmPassword }
                  className={`disabled:bg-red-300 box-shadow bg-[#633CFF] text-white py-2 rounded-lg mt-4 hover:bg-[#8770e4] font-medium ${loading ? ' bg-[#8e76f0] ' : 'bg-[#633CFF] hover:bg-[#7456eb]'}`}>{loading ? 'Creating Account...' : 'Create new account'} </button>
                  <span className='text-center'>Already have an account? <NavLink className="text-[#633CFF]" to="/login">Login</NavLink></span>
                </form>

             </section>

        </>
  )
}
