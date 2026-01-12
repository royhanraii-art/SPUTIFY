import { Metadata } from 'next'
import Body from './Body'

// Page metadata
export const metadata: Metadata = {
  title: "Spotify || Search Music"
}

// Server Component
const Page = async () => {
  return <Body/>
}

export default Page
