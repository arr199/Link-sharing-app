import { AiFillGithub } from 'react-icons/ai'
import { BiLogoCodepen } from 'react-icons/bi'
import { BsTwitch } from 'react-icons/bs'
import { FaDev, FaFreeCodeCamp, FaGitlab, FaStackOverflow } from 'react-icons/fa'
import { RiTwitterXLine, RiLinkedinBoxFill, RiYoutubeFill, RiFacebookCircleFill } from 'react-icons/ri'
import { SiFrontendmentor, SiCodewars, SiHashnode } from 'react-icons/si'

interface IconsProps {
  name: string
}

//  RETURNS AN ICON DEPENDING ON THE PLATFORM NAME
export function Icons ({ name }: IconsProps): JSX.Element {
  switch (name) {
    case 'GitHub' : return <AiFillGithub/>
    case 'Frontend Mentor' : return <SiFrontendmentor/>
    case 'Twitter' : return <RiTwitterXLine/>
    case 'Linkedin': return <RiLinkedinBoxFill/>
    case 'Youtube' : return <RiYoutubeFill/>
    case 'Facebook' : return <RiFacebookCircleFill/>
    case 'Twitch' : return <BsTwitch/>
    case 'Dev.to' : return < FaDev/>
    case 'Codewars' : return <SiCodewars/>
    case 'Codepen' : return <BiLogoCodepen/>
    case 'freeCodeCamp' : return <FaFreeCodeCamp/>
    case 'GitLab' : return <FaGitlab/>
    case 'Hashnode' : return <SiHashnode/>
    case 'Stack Overflow' : return <FaStackOverflow/>
    default : return <></>
  }
}
