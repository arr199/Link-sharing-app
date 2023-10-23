import { useEffect, useRef, useState } from 'react'
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri'
import { Icons } from './Icons'

import { AnimatePresence, motion } from 'framer-motion'
import animations from '../assets/motions'

export function DropDownMenu ({ options, setLinks, links, index }: DownMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string>(links[index].platform)
  const containerRef = useRef<HTMLTableSectionElement | null>(null)

  // OPEN THE MENU OR CLOSE IT WHEN WE CLICK ON IT
  function handleOpenMenu (): void {
    setIsOpen(!isOpen)
  }
  //  SELECT AN ITEM WHEN ON CLICK
  function handleSelectItem (item: string): void {
    setSelectedItem(item)
    setIsOpen(!isOpen)
    setLinks(old => {
      const newLinks = [...old].map(e => e.id === links[index].id ? { ...e, platform: item } : e)
      return newLinks
    })
  }
  // CLOSE THE MENU WHEN WE CLICK OUTSIDE OF IT
  useEffect(() => {
    setSelectedItem(links[index].platform)
    function handleClickOutside (e: MouseEvent): void {
      const target = e.target as Node
      // CHECK IF THE CLICK  OCURRED OUTSIDE THE CONTAINER
      if (containerRef.current !== null && !(containerRef.current as HTMLElement).contains(target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => { document.removeEventListener('click', handleClickOutside) }
  }, [links])

  return (
     <section ref={containerRef} className='drop-menu relative ' >
      <span className='text-[14px] select-none'>Platform</span>
      <div onClick={handleOpenMenu} className='box-shadow  w-full px-2 rounded-lg border-2 flex items-center h-14 cursor-pointer hover:border-[#8b76e0] focus:border-[#8b76e0] '>
        <span className={'capitalize flex items-center gap-2  py-3  hover:text-[#936deb] '}><Icons name={selectedItem} /> {selectedItem} </span>
       {/* ARROW ICON */}
        <span className='ml-auto'>{isOpen ? <RiArrowUpSLine/> : <RiArrowDownSLine/> }</span>
      </div>
      {/* OPTIONS */}
    <AnimatePresence>
     { isOpen &&
       <motion.div className='w-full px-4  rounded-lg border-2 flex cursor-pointer  absolute flex-col z-10 bg-white mt-1 overflow-y-auto max-h-[300px]  '
       {...animations.scaleAnimationLeftToBottomRightExitReverse()}>
          {options?.map((e, index) => (
            <motion.span onClick={() => { handleSelectItem(e) }}
            className={`capitalize flex items-center gap-2  py-3  hover:text-[#936deb] ${index === options.length - 1 ? '' : 'border-b-2 '} 
            ${selectedItem === e ? ' text-[#7938e2] ' : ''}`}key={e} {...animations.fadeAnimation(index / 10)}>
           {<Icons name={e} />}  {e} {selectedItem === e && '(selected)' }
            </motion.span>
          ))}
      </motion.div>}
      </AnimatePresence>
     </section>
  )
}
