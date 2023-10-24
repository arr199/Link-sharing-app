/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BiRightArrowAlt } from 'react-icons/bi'
import { NavLink, useParams } from 'react-router-dom'
import { colorClass } from '../utils/functions'
import { Icons } from '../components/Icons'
import animations from '../assets/motions'

import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { firebaseConfig, API } from '../utils/API'
import { useGetCurrentUser } from '../utils/hooks'
import { AiOutlineLink } from 'react-icons/ai'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export function Preview (): JSX.Element {
  const [saveLinks, setSaveLinks] = useState<NewLinks[]>([])
  const [savedPersonalInfo, setSavedPersonalInfo] = useState<PersonalInfo>()
  const [currentPage, setCurrentPage] = useState(1)
  const [toast, setToast] = useState<string>('')
  const totalPages = Math.ceil(saveLinks?.length / API.NUMBER_OF_LINKS_PER_PAGE)
  const { user } = useGetCurrentUser()
  const { id } = useParams()
  function handleChangePage (index: number): void {
    setCurrentPage(index + 1)
  }

  useEffect(() => {
    //  GET LINKS DATA FROM FIREBASE
    async function getLinksData (): Promise<void> {
      const docRef = doc(db, 'users', id as string)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setSaveLinks(docSnap.data().links)
      } else {
        setSaveLinks([])
      }
    }
    //  GET PERSONAL-INFO FROM FIRE-BASE
    async function getPersonalInfoData (): Promise<void> {
      const docRef = doc(db, 'users', id as string)
      const snapshot = await getDoc(docRef)
      if (snapshot.exists()) {
        setSavedPersonalInfo(snapshot.data().personalInfo)
      } else {
        setSavedPersonalInfo({ firstName: '', lastName: '', email: '', imgUrl: '' })
      }
    }
    getPersonalInfoData().catch(err => { console.log('ERROR : Get Personal Info Data :  ', err) })
    getLinksData().catch(err => {
      console.log('ERROR : Get Link Data :  ', err)
    })
  }, [user])

  // COPY THE LINK TO CLIPBOARD
  function handleShareLink (): void {
    navigator.clipboard.writeText(location.href).catch(err => { console.log('cannot copy the link', err) })
    setToast('The link has been copied to your clipboard!')
    setTimeout(() => {
      setToast('')
    }, 1000)
  }

  return (

          <section className=' flex flex-col w-full h-[110vh] lg:h-screen  overflow-scroll'>
             <header className='flex flex-col bg-[#633CFF] h-[40vh] items-center '>
                    <nav className='w-[98%] mt-5 py-10 rounded-lg px-4 flex justify-between  bg-white'>
                           { user &&
                           <>
                           <NavLink className="focus:bg-[#633CFF] focus:text-white hover:bg-[#633CFF] hover:text-white  active:scale-95  font-bold border-2 py-4 px-4 rounded-lg border-[#633CFF] text-[#633CFF]"
                            to='/'>Back to Editor
                            </NavLink>
                            <button onClick={handleShareLink} className='hover:bg-[#9884f3]  focus:bg-[#9884f3]  font-bold bg-[#633CFF] rounded-lg py-4  px-4 text-white active:scale-95'>
                                Share Link
                            </button>
                            </>}
                    </nav>
            </header>

            <div className=" w-80 p-3 h-[40.5rem]  rounded-[3.125rem] self-center absolute
             bg-white shadow-[0px_0px_15px_-5px_#242424] mt-36 " >

                <div className="flex flex-col items-center  gap-2  p-4  h-full rounded-[2.375rem] ">
            {/* IMAGE */}

            {savedPersonalInfo && Object.values(savedPersonalInfo).some(e => e !== '')
              ? < >
                <div className=" bg-[#EEEEEE] rounded-full w-[6rem] h-[6rem]  mt-4 mb-4 ">
                  {savedPersonalInfo.imgUrl !== '' && <motion.img className='rounded-full h-full w-full' alt='profile picture' src={savedPersonalInfo.imgUrl}
                  {...animations.scaleAnimationRightToLeftExitCenter(0, 0.1)} ></motion.img>}
                </div>
                {/* NAME AND EMAIL FILLED */}

                <motion.h1 {...animations.slideLeftToRightAnimation(0.3)} className="text-[18px] text-[#333333] ">{savedPersonalInfo.firstName} {savedPersonalInfo.lastName}</motion.h1>
                <motion.span {...animations.scaleAnimationRightToLeftExitCenter(0, 0.3)} className="text-[#737373] text-[14px]">{savedPersonalInfo.email}</motion.span>
              </>
              : <>
                {/* NAME AND EMAIL EMPTY */}
                <div className=" bg-[#EEEEEE] rounded-full w-[6rem] h-[6rem]  mt-4 mb-4 ">
                </div>
                <h1 className="text-[18px] text-[#333333] px-24 py-2 bg-[#EEEEEE] rounded-lg "></h1>

                <span className="text-[#737373] text-[14px]  px-12 py-1  bg-[#EEEEEE] rounded-lg "></span>
              </>}

            {/* LINKS */}
            <motion.div className="flex flex-col justify-start w-full gap-4 mt-6 " {...animations.scaleAnimationCenterExitRight(0.1)}>
              {saveLinks && Array(API.NUMBER_OF_LINKS_PER_PAGE).fill(null).map((_, index) => (
                <React.Fragment key={index} >
                  {typeof saveLinks[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)] === 'object'
                    ? <motion.a whileHover={{ scale: [1, 1.2, 1.1], transition: { stiffness: 333 } }} href={saveLinks[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)].validated ? saveLinks[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)].url : ''} target='_blank'
                      className={`index-color  w-full relative rounded-lg flex items-center py-6   hover:shadow-[0px_0px_10px_2px_#242424]  
                       ${colorClass(saveLinks[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)].platform)} `} rel="noreferrer"
                    >
                      <span className='absolute p-4 flex items-center gap-2 text-white'>{<Icons name={saveLinks[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)].platform} />}{saveLinks[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)].platform} </span>
                      <BiRightArrowAlt className="right-4 absolute text-white " />
                    </motion.a>
                    : <span className="w-full rounded-lg py-6 bg-[#EEEEEE]"></span>}
                </React.Fragment>))}
            </motion.div>
            {/* PAGINATION */}
            <div className='flex gap-6 p-4'>
              {Array(totalPages).fill('x').map((_, index) =>
                <motion.button whileHover={{ scale: [1, 1.2, 1.1], transition: { stiffness: 333 } }} onClick={() => { handleChangePage(index) }}
                  className='hover:shadow-[0px_0px_10px_2px_#242424] bg-[#eeeeee] px-2 font-bold rounded-lg ' key={index}>{index + 1}</motion.button>)}
            </div>
          </div>
            </div>
            {/* TOAST MENU */}
            <AnimatePresence>
                  {toast.length > 0 &&
              <motion.div {...animations.scaleAnimationCenterExitCenter(1.5)} className='toaster fixed  grid place-items-center  w-max h-12   inset-0 mx-auto mt-auto mb-10 whitespace-nowrap px-4 text-center  bg-[#333333] text-white rounded-lg '>
                      <span className='flex items-center gap-2 lg:text-[16px] text-[14px]'> <AiOutlineLink className=" " />{toast}</span>
              </motion.div>}
              </AnimatePresence>
              </section>

  )
}
