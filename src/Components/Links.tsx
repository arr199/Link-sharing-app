import React, { useContext, useState } from 'react'
import { nanoid } from 'nanoid'
import { API, firebaseConfig } from '../utils/API.ts'
import { AnimatePresence, motion } from 'framer-motion'
import animations from '../assets/motions.ts'

// ICONS
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { PiFloppyDiskBackLight } from 'react-icons/pi'
// CONTEXT
import { GlobalContext } from './Layout.tsx'
// COMPONENTS
import { DropDownMenu } from './DropDownMenu.tsx'
import { UrlInput } from './UrlInput.tsx'
// UTILS
import { verifyUrl } from '../utils/functions.ts'
import { useGetCurrentUser } from '../utils/hooks.tsx'
import { initializeApp } from 'firebase/app'
import { getFirestore, setDoc, doc } from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

interface DroppedELement {
  currentIndex: number | null | string

}

export function Links (): JSX.Element {
  const { links, setLinks } = useContext(GlobalContext)
  const [toast, setToast] = useState<string>('')
  const [droppedElement, setDroppedElement] = useState<DroppedELement>({ currentIndex: null })
  const [isDragging, setIsDraggin] = useState<null | number>(null)
  const { user } = useGetCurrentUser()

  // ADD LINK
  function handleAddLink (): void {
    if (links.length >= 20) {
      if (links.length >= 20) {
        setToast(`No more than ${API.MAX_NUMBER_OF_LINKS} links allowed`)
        setTimeout(() => {
          setToast('')
        }, 1000)
      }
      return
    }

    const newLinks = [...links, { url: '', platform: 'GitHub', id: nanoid(), validated: false }]
    setLinks(newLinks)
    setDoc(doc(db, 'users', user.uid), { links: newLinks }, { merge: true }).catch(err => { console.log('ERROR REMOVING LINK :', err) })
  }
  // REMOVE LINK
  function handleRemoveLink (id: string): void {
    const newLinks = [...links].filter(e => e.id !== id)
    setLinks(newLinks)
    setDoc(doc(db, 'users', user.uid), { links: newLinks }, { merge: true }).catch(err => { console.log('ERROR REMOVING LINK :', err) })
  }

  // VALIDATE AND SAVE THE LINKS
  function saveLinks (): void {
    setToast('Your changes have been successfully saved!')
    const validatedLinks = [...links].map(e => ({ ...e, validated: true }))
    setLinks(validatedLinks)

    setDoc(doc(db, 'users', user.uid), { links: validatedLinks }, { merge: true }).catch(err => { console.log(err) })
    setTimeout(() => {
      setToast('')
    }, 1000)
  }

  //  SAVING THE DRAGGED ELEMENT INDEX AND ADDING A DRAGGING CLASS
  function handleDrag (e: PointerEvent): void {
    e.preventDefault()
    const target = e.target as HTMLElement
    setDroppedElement({ ...droppedElement, currentIndex: Number(target.dataset.index) })
    target.classList.add('dragging')
  }
  //  REMOVE THE DRAGGED ELEMENT FROM THE ARRAY AND PUSH THE TARGET INDEX
  function handleDropLink (e: React.MouseEvent): void {
    const target = e?.currentTarget as HTMLElement
    if (droppedElement.currentIndex === null) {
      setIsDraggin(null)
      return
    }
    const targetIndex = Number(target.dataset.index)
    const elementToAdd = [...links][Number(droppedElement.currentIndex)]

    const newLinks = [...links].filter((_, index) => index !== droppedElement.currentIndex)
    newLinks.splice(targetIndex, 0, elementToAdd)
    setLinks(newLinks)
    setIsDraggin(null)
    setDroppedElement({ ...droppedElement, currentIndex: null })
  }
  // PREVENTING THE DEFAULT DRAGOVER IN ORDER TO ADD DRAG AND DROP FUNCTIONALITY
  function handleDragOver (e: React.DragEvent): void {
    e.preventDefault()
  }
  // REMOVING THE DRAGGING CLASS WHEN THE DRAG EVENTS IS OVER
  function handleDragEnd (e: React.DragEvent): void {
    const target = e.target as HTMLElement
    target.classList.remove('dragging')
  }

  function handleDragOverLink (e: React.DragEvent): void {
    e.preventDefault()

    if (droppedElement.currentIndex === null) {
      return
    }
    const target = e.currentTarget as HTMLElement
    // IF ITS DRAGGING OVER ITSELF DO NOT APPLY THE DRAGGING CLASS
    if (Number(droppedElement.currentIndex) !== Number(target.dataset.index)) {
      setIsDraggin(Number(target.dataset.index))
    }
  }

  function handleDragLeave (): void {
    setIsDraggin(null)
  }

  return (
    <section onDragEnd={handleDragEnd} onDragOver={handleDragOver} id='links-section'
    className="flex w-full lg:w-[60%] lg:max-w-[800px]  flex-col gap-2  bg-white p-8 rounded-lg  ">
      <h1 className="font-bold text text-3xl">Customize your links</h1>
      <p className="text-[#737373]">Add/edit/remove links below and then share all your profiles with the world!</p>
      {/* ADD NEW LINK */}
      <button onClick={handleAddLink} className=" mt-4 border-2 border-[#ada1db]  text-[#633CFF] font-bold rounded-lg py-2 hover:bg-[#e7e2fc] active:scale-95">+ Add new link</button>

      {/* LINKS CONTAINER (NO LINKS) */}
      {links.length <= 0
        ? <div className="flex flex-col justify-center items-center gap-10 mt-10">
          <img className="w-40 " src="/images/illustration-empty.svg" alt='links image' />
          <h1 className="text-3xl font-bold">Let’s get you started</h1>
          <p className="text-[#737373]">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them.
            We’re here to help you share your profiles with everyone!
          </p>
        </div>
        // LINKS CONTAINER (AT LEAST 1 LINK)
        : <div>
          <AnimatePresence>
            {links.map((link, index) => (
              <motion.div data-index={index} onDragLeave={handleDragLeave} onDragOver={handleDragOverLink} onDrop={handleDropLink} draggable onDrag={handleDrag}
                key={link.id} className={`links  p-4 rounded-lg mt-2 ${isDragging === index ? 'bg-[#cac9c9] ' : 'bg-[#FAFAFA] '}`} {...animations.scaleAnimationCenterExitRight(0)} >
                <div className='flex items-center gap-1 text-[#737373] py-2 '>
                  <HiOutlineMenuAlt4 />
                  <span className='font-bold'>Link #{index + 1}</span>
                  {/* REMOVE BUTTON */}
                  <button onClick={() => { handleRemoveLink(link.id) }}
                    className='ml-auto hover:text-red-500 hover:font-bold'>Remove</button>
                </div>
                {/* PLATFORM MENU */}
                <DropDownMenu setLinks={setLinks} links={links} index={index} options={API.DROPDOWN_MENU_PLATFORMS}></DropDownMenu>
                {/* URL INPUT */}
                <UrlInput links={links} index={index} setLinks={setLinks} ></UrlInput>
              </motion.div>))}
          </AnimatePresence> </div>}

      {/* SAVE BUTTON */}
      <div className="border-t-2 flex justify-end   py-4 px-4">
        <button disabled={links.every(e => e.url.length < 1) || links.some(e => e.url.includes(' ')) || verifyUrl(links)}
          onClick={saveLinks} className=" w-full sm:w-auto active:scale-90 border-2 px-6 py-2 rounded-lg text-white bg-[#633CFF] disabled:bg-[#9b8cd7]">Save</button>
      </div>
      {/* Toast menu */}
      <AnimatePresence>
        {toast.length > 0 &&
          <motion.div {...animations.scaleAnimationCenterExitCenter(1.5)} className={`toaster fixed  grid place-items-center  w-max h-12   inset-0 mx-auto mt-auto mb-10 whitespace-nowrap px-4 text-center   text-white rounded-lg ${links.length >= 20 ? ' bg-red-600 ' : ' bg-[#333333]'} `}>
            <span className='lg:text-[16px] text-[14px]  flex items-center gap-2'><PiFloppyDiskBackLight />{toast}</span>
          </motion.div>}
      </AnimatePresence>
    </section>

  )
}
