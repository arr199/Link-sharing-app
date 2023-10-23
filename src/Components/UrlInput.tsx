import { useState, useEffect } from 'react'
import { placeHolderUrl, verifyUrl } from '../utils/functions'
import { AiOutlineLink } from 'react-icons/ai'

export function UrlInput ({ links, index, setLinks }: UrlInputProps): JSX.Element {
  const [error, setError] = useState<string>('')
  const errorClass = error === '' ? ' box-shadow border-[#8b76e0] hover:border-[#8b76e0] focus:border-[#8b76e0] ' : ' border-red-500  focus:border-red-500  hover:border-red-500 '

  // UPDATING THE LINKS URL EVERY TIME THE INPUT CHANGE
  function handleUrlInput (event: React.ChangeEvent<HTMLInputElement>, linkId: string): void {
    const target = event.target as HTMLInputElement
    setLinks(old => {
      const newLink = [...old].map(e => e.id === linkId ? { ...e, url: target.value } : e)
      return newLink
    })
  }
  // VERIFYING THE LINKS TO SHOW THE ERROR IF IT IS NECESSARY
  useEffect(() => {
    if (links[index].url.length > 0) {
      if (links[index].url.includes(' ')) {
        setError('Please no white spaces')
      } else if (verifyUrl([links[index]])) {
        setError('Check the URL')
      } else setError('')
    } else setError('')
  }, [links])

  return (
    <>
     <section>
      <span className='text-[14px] select-none'>Link</span>
                                                             { /* PREVENT THE DRAGGING IN THE URL INPUT FIELD */}
      <div className=' relative grid place-items-center ' draggable onDragStart={(e) => { e.preventDefault() }}>
        <AiOutlineLink className="absolute left-4 " />
        <input list={placeHolderUrl(links[index].platform)}
          value={links[index].url} onChange={(e) => { handleUrlInput(e, links[index].id) }}
          placeholder={placeHolderUrl(links[index].platform) + '/elonmusk'}
          className={`inputs-class outline-none pl-10 w-full p-4  rounded-lg border-2 flex h-14 cursor-text  ${errorClass}`} />
        {/* CHECK URL ERROR */}
       <datalist id={placeHolderUrl(links[index].platform)}>
        <option>{placeHolderUrl(links[index].platform)}</option>
       </datalist>
        <span className='text-red-500 absolute right-5 md:bottom-auto bottom-[-20px] text-[14px] z-20'>{error}</span>
      </div>
      </section>
    </>
  )
}
