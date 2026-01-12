'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaPlay, FaPause, FaTimes } from 'react-icons/fa'
import { usePlayData } from '../Zustnd/player'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { useData } from '../Zustnd/TotalData'

const Player = () => {
  const { data, stopSong,playSong,index ,allData} = usePlayData()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [localPlaying, setLocalPlaying] = useState(false)
  const [dragging, setDragging] = useState(false)

  // Auto play and time update
  useEffect(() => {
    if (!data?.downloadUrl?.length) return
    if (!audioRef.current) return

    const handleLoadedMetadata = () => setDuration(audioRef.current?.duration || 0)
    const handleTimeUpdate = () => {
      if (!dragging) setCurrentTime(audioRef.current?.currentTime || 0)
    }

    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate)

    audioRef.current.play().catch(() => {})
    setLocalPlaying(true)

    return () => {
      audioRef.current?.pause()
      audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate)
      setLocalPlaying(false)
    }
  }, [data, dragging])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (localPlaying) {
      audioRef.current.pause()
      setLocalPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setLocalPlaying(true)
    }
  }

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return `${min}:${sec < 10 ? '0' + sec : sec}`
  }

  // Handle user click or drag on progress bar
  const seek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!audioRef.current || !progressRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const newTime = (offsetX / rect.width) * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleNext = ()=>{
     if(index==data?.length-1){
      return;
    }
    const mydata = allData[index+1]

    playSong(mydata?.id , mydata, index+1)
  }

  const handlePrevious = ()=>{
    if(index==0){
      return;
    }
    const mydata = allData[index-1]

    playSong(mydata?.id , mydata, index-1)
  }

  if (!data?.downloadUrl?.length) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 md:h-[10rem] h-[8rem] mx-2 rounded-xl overflow-clip backdrop-blur-sm flex items-center p-4 z-50"
      style={{
        backgroundImage: `url(${data.image?.[data.image.length - 1]?.link})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative flex flex-col  w-full justify-between items-center z-10 gap-4 md:gap-8">
        {/* Left: Song Info */}
        <div className="flex-1 flex flex-col text-white w-full ">
          <h2 className="text-lg md:text-2xl font-bold truncate">{data.name.replace(/&quot;/g, '"')}</h2>
          <p className="text-sm md:text-base truncate">{data.primaryArtists}</p>

          {/* Interactive Progress Bar */}
          <div className="flex items-center gap-2 mt-1 flex-1">
            <span className="text-xs md:text-sm">{formatTime(currentTime)}</span>
            <div
              className="flex-1 h-1 bg-gray-400 rounded cursor-pointer relative"
              ref={progressRef}
              onClick={seek}
              onMouseDown={() => setDragging(true)}
              onMouseUp={() => setDragging(false)}
              onMouseLeave={() => setDragging(false)}
            >
              <div
                className="h-1 bg-green-500 rounded"
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
              ></div>
            </div>
            <span className="text-xs md:text-sm">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3  md:gap-2">
         { index!==0 &&
           <button onClick={handlePrevious} className='bg-gray-300 cursor-pointer rounded-full w-10 flex justify-center items-center h-10'>
            <FcPrevious className='text-3xl'/>
          </button>
         }
          <button
            onClick={togglePlay}
            className="text-white cursor-pointer bg-green-500 hover:bg-green-600 p-3 md:p-2 rounded-full shadow-md flex items-center justify-center"
          >
            {localPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
          </button>

         { index!=data?.length-1 &&
          
         <button onClick={handleNext} className='bg-gray-300 w-10 flex justify-center items-center h-10 cursor-pointer rounded-full'>
            <FcNext className='text-3xl'/>
          </button>
          }
          <button
            onClick={stopSong}
            className="text-white cursor-pointer bg-red-500 hover:bg-red-600 p-3 md:p-2 rounded-full shadow-md flex items-center justify-center"
          >
            <FaTimes size={18} />
          </button>
        </div>
      </div>

      {/* Hidden audio */}
      <audio onEnded={handleNext} ref={audioRef} src={data.downloadUrl[data?.downloadUrl.length-1].link} preload="auto" />
    </div>
  )
}

export default Player
