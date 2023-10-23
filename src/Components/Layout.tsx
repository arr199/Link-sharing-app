import { Outlet } from 'react-router'
import React, { type SetStateAction, createContext, useState } from 'react'

interface GlobalContextType {
  links: NewLinks[]
  setLinks: React.Dispatch<React.SetStateAction<NewLinks[]>>
  personalInfo: PersonalInfo
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>
  userIsLogged: string | boolean
  setUserIsLogged: React.Dispatch<SetStateAction< string | boolean>>

}

export const GlobalContext = createContext<GlobalContextType >({
  links: [],
  setLinks: () => {},
  personalInfo: { firstName: '', lastName: '', email: '', imgUrl: '' },
  setPersonalInfo: () => {},
  userIsLogged: false,
  setUserIsLogged: () => false

})

export function Layout (): JSX.Element {
  const [links, setLinks] = useState<NewLinks[]>([])
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({ firstName: '', lastName: '', email: '', imgUrl: '' })
  const [userIsLogged, setUserIsLogged] = useState<string | boolean>(false)

  return (
          <>
          {/* SPREADING STATES ACROSS THE COMPONENTS */}
             <GlobalContext.Provider value={{ links, setLinks, personalInfo, setPersonalInfo, userIsLogged, setUserIsLogged }}>
                <Outlet></Outlet>
             </GlobalContext.Provider>
            </>

  )
}
