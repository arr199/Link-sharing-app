// CHANGE THE COLOR OF THE LINKS DEPENDING ON THE PLATFORM NAME
export function colorClass (platform: string): string | undefined {
  switch (platform) {
    case 'GitHub' : return 'bg-slate-900'
    case 'Frontend Mentor' : return 'bg-green-600'
    case 'Twitter' : return 'bg-[#43B7E9]'
    case 'Linkedin' : return 'bg-[#2D68FF]'
    case 'Youtube' : return 'bg-red-600'
    case 'Facebook' : return 'bg-[#2442AC]'
    case 'Twitch' : return 'bg-violet-600'
    case 'Dev.to' : return 'bg-[#333]'
    case 'Codepen' : return 'bg-[#6f0f00]'
    case 'Codewars' : return 'bg-[#8A1A50]'
    case 'freeCodeCamp' : return 'bg-[#302267]'
    case 'GitLab' : return 'bg-[#EB4925]'
    case 'Hashnode' : return 'bg-[#0330D1]'
    case 'Stack Overflow' : return 'bg-[#EC7100]'
  }
}
// CONVERT THE USER INPUT TO LOWER CASE AND REMOVE WHITE-SPACES IN ORDER TO MATCH THE URL
export function convertUrl (url: string): string {
  return url.toLowerCase().replace(/ +/g, '')
}
// VALIDATE THE URL AND RETURN A STRING WITH THE NEW URL
export function placeHolderUrl (url: string): string {
  switch (convertUrl(url)) {
    case 'dev.to' : return `https://www.${convertUrl(url)}`
    case 'frontendmentor' : return `https://www.${convertUrl(url)}.io`
    case 'freecodecamp' : return `https://www.${convertUrl(url)}.org`
    case 'codepen' : return `https://www.${convertUrl(url)}.io`
    default : return `https://www.${convertUrl(url)}.com`
  }
}

// VALIDATE THE URL DEPENDING ON THE PLATFORM, RETURNING TRUE OR FALSE
export function verifyUrl (links: NewLinks[]): boolean {
  const validated = !links.every(e => {
    switch (convertUrl(e.platform)) {
      case 'dev.to' : return e.url.includes('https://www.dev.to')
      case 'frontendmentor' : return e.url.includes('https://www.frontendmentor.io')
      case 'freecodecamp' : return e.url.includes('https://www.freecodecamp.org')
      case 'codepen' : return e.url.includes('https://www.codepen.io')
      default : return e.url.includes(`https://www.${convertUrl(e.platform)}.com`)
    }
  })
  return validated
}
