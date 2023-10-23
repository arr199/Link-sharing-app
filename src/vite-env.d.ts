interface NewLinks {
  url: string | ''
  platform: string | ''
  id: string | ''
  validated: boolean

}

interface PersonalInfo {
  firstName: string | ''
  lastName: string | ''
  email: string | ''
  imgUrl: string | ''

}
interface DownMenuProps {
  options: string[]
  setLinks: React.Dispatch<React.SetStateAction<NewLinks[]>>
  links: NewLinks[]
  index: number
}

interface UrlInputProps {
  links: NewLinks[]
  index: number
  setLinks: React.Dispatch<React.SetStateAction<NewLinks[]>>

}

interface ImportMeta {
  env: {
    VITE_FIREBASE_APIKEY: string
    VITE_AUTH_DOMAIN: string
    VITE_PROJECT_ID: string
    VITE_STORAGEBUCKET: string
    VITE_MESSAGING_SENDER_ID: string
    VITE_APP_ID: string
  }
}

interface FormDataSignUp {
  email: string | ''
  password: string | ''
  confirmPassword: string | ''
}

interface FormDataLogin {
  email: string | ''
  password: string | ''
}

interface ProfileErrors {
  firstName: string
  lastName: string
  email: string

}
