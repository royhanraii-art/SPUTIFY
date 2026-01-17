'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
  const [input, setInput] = useState('')
  const router = useRouter()

  // Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    if(!input){
      return
    }
    e.preventDefault() // prevent page reload
    if (input.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`)
    }
  }

  return (
    <nav className='fixed z-30 bg-white h-20 flex justify-between items-center p-4 md:p-8 top-0 left-0 right-0 border-b border-gray-300 shadow shadow-gray-400'>
      <Link href="/" className='flex gap-1 items-center text-sm sm:text-lg md:text-xl text-green-500 font-bold tracking-wide'>
        <Image src={'/spotify-logo.png'} alt='Logo' width={24} height={24} />
        SPUTIFY
      </Link>

      <form
        onSubmit={handleSearch}
        className='flex justify-center p-1 md:p-2 items-center gap-2 text-sm md:text-[1rem] border-2 md:w-[17rem] border-green-400 rounded'
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='border-none outline-none flex-1'
          placeholder='Search Music'
        />
        <button
          type="submit"
          className='  px-3 py-1 rounded h-full  flex items-center gap-1'
        >
          <BsSearch />
        </button>
      </form>
    </nav>
  )
}

export default Navbar
