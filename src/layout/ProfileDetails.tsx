import { PiImageLight } from 'react-icons/pi'
import { GlobalContext } from '../components/Layout'

import React, { type ChangeEvent, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import animations from '../assets/motions'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../utils/API'
import { useGetCurrentUser } from '../utils/hooks'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export function ProfileDetails (): JSX.Element {
  const { setPersonalInfo, personalInfo } = useContext(GlobalContext)
  const [formData, setFormData] = useState<PersonalInfo>({ firstName: personalInfo?.firstName ?? '', lastName: personalInfo?.lastName ?? '', email: personalInfo?.email ?? '', imgUrl: personalInfo?.imgUrl ?? '' })
  const [error, setError] = useState<ProfileErrors>({ firstName: '', lastName: '', email: '' })
  const [toast, setToast] = useState<string>('')
  const errorClass = (name: string): string => error[name as keyof ProfileErrors] === '' ? ' box-shadow ' : ' border-red-500 '
  const { user } = useGetCurrentUser()

  function handleFormChange (e: React.FormEvent): void {
    e.preventDefault()
    // UPDATING FORM DATA
    const target = e.target as HTMLInputElement
    const newFormData = { ...formData, [target.id]: target.value }
    setFormData(newFormData)
    // VALIDATING FIELDS
    if (target.id === 'firstName' || target.id === 'lastName' || target.id === 'email') {
      if (target.value === '') {
        const newError = { ...error, [target.id]: 'Can’t be empty' }
        setError(newError)
      } else setError(old => ({ ...old, [target.id]: '' }))
    }
  }
  // DRAG AND DROP THE IMAGE
  function handleDropImage (e: React.DragEvent): void {
    e.preventDefault()
    // GETTING THE DROPPED FILE
    const file = e.dataTransfer.files[0]
    // BECAUSE THE FILE IS IMAGE WE CREATE A NEW IMAGE() OBJECT
    const image = new Image()

    if (file?.type.startsWith('image/')) {
      const reader = new FileReader()
      // REDING THE FILE
      reader.onload = (e) => {
        // SETTING  IMG.SRC ATTRIBUTE TO THE RESULT OF THE FILE
        image.src = e.target?.result as string
        // NOW WE HAVE AN IMG.SRC THAT WE CAN USE IN ORDER TO RENDER THE IMAGE
        image.onload = function () {
          // WE ACCESS THE WIDTH AND HEIGHT IN ORDER TO ESTABLISH SOME VALIDATION
          if (image.width <= 1024 && image.height <= 1024) {
            setFormData({ ...formData, imgUrl: e.target?.result as string })
          } else {
            setToast('Image must be below 1024x1024 px.')
            setTimeout(() => {
              setToast('')
            }, 1000)
          }
        }
      }
      // WE READ THE FILE AS AN URL
      reader.readAsDataURL(file)
    } else {
      setToast('Please drop an image file.')
      setTimeout(() => {
        setToast('')
      }, 1000)
    }
  }
  // UPLOAD THE IMAGE VIA INPUT TYPE="file"
  // SAME EXPLANATION ABOVE
  function handleUploadImage (e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
    const target = e.target
    const file = target?.files?.[0] as File

    const image = new Image()

    if (file?.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        image.src = e?.target?.result as string

        image.onload = () => {
          if (image.width <= 1024 && image.height <= 1024) {
            setFormData({ ...formData, imgUrl: e.target?.result as string })
          } else {
            setToast('Image must be below 1024x1024 px.')
            setTimeout(() => { setToast('') }, 1000)
          }
        }
      }

      reader.readAsDataURL(file)
    } else {
      setToast('Please drop an image file.')
      setTimeout(() => { setToast('') }, 1000)
    }
  }

  function handleDragOver (e: React.DragEvent): void {
    e.preventDefault()
  }

  //  ADDING OUT VALIDATED DATA TO personalInfo STATE
  function saveInfo (): void {
    setPersonalInfo(formData)
    setToast('Your changes have been successfully saved!')

    setDoc(doc(db, 'users', user.uid), {
      personalInfo:
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        imgUrl: formData.imgUrl
      }
    }, { merge: true })
      .catch(err => { console.log(err) })
    setTimeout(() => {
      setToast('')
    }, 1000)
  }

  return (
            <section className="flex flex-col gap-2 lg:max-w-[800px]  w-full lg:w-[60%] bg-white p-8 rounded-lg    ">
                 <h1 className="font-bold text text-3xl">Profile Details</h1>
                 <p className="text-[#737373]">Add your details to create a personal touch to your profile.</p>
                  {/* IMAGE CONTAINER */}
                  <ul className="flex sm:flex-row flex-col items-start  sm:items-center  justify-between bg-[#FAFAFA] text-[#737373] rounded-lg px-6 py-4  gap-4 ">
                    <li>Profile picture</li>
                    <label onDrop={handleDropImage} onDragOver={handleDragOver} htmlFor='image-upload'
                        className=' text-[#633CFF] w-40 h-40 flex  flex-col justify-center items-center  bg-[#EFEBFF] rounded-lg cursor-pointer
                         hover:bg-[#c7baf8] '>
                      <input className='hidden' id='image-upload' onChange={handleUploadImage}
                      type='file' accept="images/*" ></input>
                     { formData.imgUrl !== ''
                     //  IMAGE
                       ? <img className='w-full h-full object-cover' src={formData.imgUrl} alt="profile picture"></img>
                       : <>
                        <PiImageLight className="w-14 h-14 "/>
                        <strong>+ Upload Image</strong>
                        </>}
                    </label>
                    <li className='text-[13px]'>Image must be below 1024x1024px.<br></br> Use PNG or JPG format.</li>
                  </ul>
                  {/* PERSONAL INFO FORM */}
                  <form onChange={handleFormChange} className='flex flex-col justify-between items-center  bg-[#FAFAFA] rounded-lg px-6 py-4 gap-3 text-[#333333]'>
                      {/* FIRST NAME */}
                      <div className='relative flex flex-wrap sm:flex-nowrap gap-2 items-center justify-between w-full'>
                        <label htmlFor='firstName' className='whitespace-nowrap'>First name*</label>
                        <input
                          value={formData.firstName} onChange={handleFormChange}
                          id='firstName' placeholder='e.g. John' type='text'
                          className={` w-full sm:w-[70%] outline-none p-4  rounded-lg border-2 flex h-14 cursor-text ${errorClass('firstName')} `}/>
                         { error.firstName !== '' && <span className='text-red-500  sm:bottom-auto bottom-[-20px] absolute right-5 text-[14px]'>{error.firstName}</span> }
                      </div>
                      {/* LAST NAME */}
                      <div className='relative flex flex-wrap sm:flex-nowrap items-center justify-between w-full'>
                        <label htmlFor='lastName' className='   whitespace-nowrap'>Last name*</label>
                        <input
                          value={formData.lastName} onChange={handleFormChange}
                          id='lastName' placeholder='e.g. Appleseed' type='text'
                          className={`  w-full sm:w-[70%]  outline-none p-4  rounded-lg border-2 flex h-14 cursor-text ${errorClass('lastName')} `}/>
                          {error.lastName !== '' && <span className='text-red-500  sm:bottom-auto bottom-[-20px] absolute right-5 text-[14px]'>{error.lastName}</span>}
                      </div>
                      {/* EMAIL */}
                      <div className='relative flex items-center flex-wrap sm:flex-nowrap justify-between w-full '>
                        <label htmlFor='email' className='whitespace-nowrap'>Email</label>
                        <input
                          value={formData.email} onChange={handleFormChange}
                          id='email' placeholder='e.g. email@example.com' type='email'
                          className={` w-full sm:w-[70%]   outline-none p-4  rounded-lg border-2 flex h-14 cursor-text ${errorClass('email')} `}/>
                          {error.email !== '' && <span className='text-red-500 absolute sm:bottom-auto bottom-[-20px] right-5 text-[14px] '>{error.email}</span>}
                      </div>
                  </form>
                  {/* SAVE BUTTON */}
                  <div className="border-t-2 flex justify-end mt-20  py-4 px-4 ">
                    <button disabled={ formData.firstName === '' || formData.lastName === '' || formData.email === '' }
                    onClick={saveInfo} className=" w-full sm:w-auto active:scale-90 border-2 px-6 py-2 rounded-lg text-white bg-[#633CFF] disabled:bg-[#9b8cd7]">Save</button>
                  </div>
                  <AnimatePresence>
                  {toast.length > 0 &&
              <motion.div {...animations.scaleAnimationCenterExitCenter(1.5)} className='toaster fixed  grid place-items-center  w-max h-12   inset-0 mx-auto mt-auto mb-10 whitespace-nowrap px-4 text-center  bg-[#333333] text-white rounded-lg '>
                      <span className='lg:text-[16px] text-[14px]  flex items-center gap-2'><PiImageLight/>{toast}</span>
              </motion.div>}
              </AnimatePresence>
            </section>

  )
}
