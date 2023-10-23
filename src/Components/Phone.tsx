/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext, useState } from 'react'
import { GlobalContext } from './Layout'

// ICONS
import { BiRightArrowAlt } from 'react-icons/bi'
import { colorClass } from '../utils/functions'

import { Icons } from './Icons'
import { motion } from 'framer-motion'
import animations from '../assets/motions'

import { API } from '../utils/API'

export function Phone (): JSX.Element {
  const { links, personalInfo } = useContext(GlobalContext)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(links?.length / API.NUMBER_OF_LINKS_PER_PAGE)

  function handleChangePage (index: number): void {
    setCurrentPage(index + 1)
  }

  return (
    <>

      <section className="lg:flex justify-center w-[60%] bg-white pt-6 rounded-lg hidden" >
        <motion.div className="border  w-80 p-3 h-[40.5rem] border-[#737373] rounded-[3.125rem] fixed" {...animations.rotatingAnimation()} >
          {/* ABSOLUTE CONTAINER */}
          <div className="flex flex-col items-center  gap-2 border border-[#737373] p-4  h-full rounded-[2.375rem] ">
            {/* IMAGE */}

            {personalInfo && Object.values(personalInfo).some(e => e !== '')
              ? < >
                <div className=" bg-[#EEEEEE] rounded-full w-[6rem] h-[6rem]  mt-4 mb-4 ">
                  {personalInfo.imgUrl !== '' && <motion.img className='rounded-full h-full w-full' alt='profile picture' src={personalInfo.imgUrl} {...animations.scaleAnimationRightToLeftExitCenter()} ></motion.img>}
                </div>
                {/* NAME AND EMAIL FILLED */}

                <motion.h1 {...animations.scaleAnimationRightToLeftExitCenter()} className="text-[18px] text-[#333333] ">{personalInfo.firstName} {personalInfo.lastName}</motion.h1>
                <motion.span {...animations.scaleAnimationRightToLeftExitCenter()} className="text-[#737373] text-[14px]">{personalInfo.email}</motion.span>
              </>
              : <>
                {/* NAME AND EMAIL EMPTY */}
                <div className=" bg-[#EEEEEE] rounded-full w-[6rem] h-[6rem]  mt-4 mb-4 ">
                </div>
                <h1 className="text-[18px] text-[#333333] px-24 py-2 bg-[#EEEEEE] rounded-lg "></h1>

                <span className="text-[#737373] text-[14px]  px-12 py-1  bg-[#EEEEEE] rounded-lg "></span>
              </>}

            {/* LINKS */}

            <motion.div className="flex flex-col justify-start w-full gap-4 mt-6 " {...animations.scaleAnimationRightToLeftExitCenter()}>
              {Array(API.NUMBER_OF_LINKS_PER_PAGE).fill(null).map((_, index) => (
                <React.Fragment key={index} >
                  {typeof links[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)] === 'object'
                    ? <motion.a whileHover={{ scale: [1, 1.2, 1.1], transition: { stiffness: 333 } }} href={links[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)].validated ? links[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)].url : ''} target='_blank'
                      className={`index-color  w-full relative rounded-lg flex items-center py-6   hover:shadow-[0px_0px_10px_2px_#242424]  
                       ${colorClass(links[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)].platform)} `} rel="noreferrer"
                    >
                      <span className='absolute p-4 flex items-center gap-2 text-white'>{<Icons name={links[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)].platform} />}{links[index + (currentPage * API.NUMBER_OF_LINKS_PER_PAGE - API.NUMBER_OF_LINKS_PER_PAGE)].platform} </span>
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
        </motion.div>
      </section>
    </>

  )
}
