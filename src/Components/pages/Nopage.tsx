import { NavLink } from 'react-router-dom'

export function NoPage (): JSX.Element {
  return (
        <section className="h-screen flex  items-center flex-col mt-40 gap-8 ">
             <img src='/images/logo-devlinks-large.svg'></img>
             <h1 className="text-center text-5xl font-semibold  ">Oops, Nothing here!</h1>
             <NavLink to="/" className='hover:bg-[#9884f3]  focus:bg-[#9884f3]  font-bold bg-[#633CFF] rounded-lg py-4  px-4 text-white active:scale-95'>Go back
             </NavLink>
        </section>

  )
}
