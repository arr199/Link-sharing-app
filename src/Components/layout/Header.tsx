import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineLink } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { GoSignOut } from 'react-icons/go'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../utils/API'
import { getAuth, signOut } from 'firebase/auth'
import { GlobalContext } from '../Layout'
import { useContext } from 'react'
import { useGetCurrentUser } from '../../utils/hooks'

initializeApp(firebaseConfig)
const auth = getAuth()

export function Header (): JSX.Element {
  const navigate = useNavigate()
  const linksClass = ' flex py-2 rounded-lg px-4 hover:text-[#633CFF]  lg:ml-auto'
  const profileClass = ' px-4 lg:px-12 py-2 gap-2  rounded-lg flex cursor-pointer hover:text-[#633CFF] '
  const { setLinks, setPersonalInfo } = useContext(GlobalContext)
  const { user } = useGetCurrentUser()

  function signOutUser (): void {
    signOut(auth).then(_ => {
      setLinks([])
      setPersonalInfo({ firstName: '', lastName: '', email: '', imgUrl: '' })
      navigate('/login')
    }).catch(err => { console.log(err) })
  }

  return (
      <header className="flex items-center w-full p-4 ">
          <nav className="bg-white  flex justify-between w-full p-8 rounded-lg items-center ">
            {/* LOGO BIG */}
            <img className='hidden  lg:block' src="/images/logo-devlinks-large.svg" alt='devlinks logo'/>
            {/* LOGO SMALL */}
            <img className='flex  lg:hidden lg:w-6 lg:h-6  w-8 h-8' src='/images/logo-devlinks-small.svg'></img>
            <div className="flex r text-[#737373] w-full justify-center ">
              {/* LINKS  */}
              <NavLink to="/" className={({ isActive }) => isActive ? 'bg-[#EFEBFF] text-[#633CFF] ' + linksClass : ' ' + linksClass } >
                <AiOutlineLink className="lg:w-6 lg:h-6  w-8 h-8  " />
                <button className="hidden lg:flex    font-bold ml-2  items-center gap-2"> Links</button>
              </NavLink >
             {/* PROFILE DETAILS */}
              <NavLink to='profile' className={ ({ isActive }) => isActive ? 'bg-[#EFEBFF] text-[#633CFF]' + profileClass : '' + profileClass }>
                   <BiUserCircle className="lg:w-6 lg:h-6  w-8 h-8  " />
                   <button className="hidden lg:flex font-bold whitespace-nowrap  items-center gap-2" >  Profile Details</button>
              </NavLink >
              {/* PREVIEW */}
              <div className='flex lg:ml-auto items-center '>
                  {/* BIG SCREEN */}
                <NavLink to={`/preview/${user.uid}`} className="text-[#633CFF] hidden lg:flex border-[2px] mr-4 font-bold rounded-lg border-[#9681e9] px-8 py-2 self-center hover:bg-[#EFEBFF]">Preview </NavLink>
                  {/* SMALL SCREEN */}
                <NavLink to={`/preview/${user.uid}`} className=" flex  lg:hidden  lg:w-6 lg:h-6  w-8 h-8  ml-2 " ><img src='/images/icon-preview-header.svg' ></img>  </NavLink>
              </div>
            </div>
          {/* LOG OUT */}
            <button onClick={signOutUser} className='text-[#633CFF] ml-4  ' ><GoSignOut className="w-10 h-10" /></button>

          </nav>
        </header>
  )
}
