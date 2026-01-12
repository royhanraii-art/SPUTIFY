import React, { useState, useRef, useEffect } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import {usePlayData} from '../Zustnd/player'
import { useData } from '../Zustnd/TotalData'

const Music = ({ data,idx }: { data: any ,idx:number}) => {

const {songId,playSong,stopSong,setAllData} = usePlayData()

const {data:all} = useData()

  // Process song name
  const fullText = (data.name || '').replace(/&quot;/g, '"')
  const [song, rawRest] = fullText.split(/\s*\(/, 2)
  const rest = rawRest ? rawRest.replace(/\)$/, '') : ''

  



  return (
    <div className="sm:w-[16rem] sm:block flex justify-between items-center relative overflow-hidden md:h-[12rem] w-full h-[8rem] rounded-xl shadow-xl bg-gray-800 text-white">
      {/* Song Image */}
      <img
        src={data?.image?.[data?.image.length - 1]?.link}
        alt={song}
        className="sm:w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />

      {/* Overlay */}
      <div className="sm:absolute bottom-0 left-0 right-0 p-2 backdrop-blur-sm h-full w-full sm:h-[8rem] bg-black/50 flex flex-col justify-end">
        <div className="text-sm font-semibold truncate">{song}</div>
        {rest && <div className="text-xs italic text-gray-300 truncate">{rest}</div>}
        {data.year && <div className="text-xs text-gray-200 mt-0.5">Year: {data.year}</div>}
        {data.primaryArtists && <div className="text-xs text-gray-200 mt-0.5">Artists: {data.primaryArtists}</div>}

        {/* Play/Pause Button */}
        {data.downloadUrl?.length > 0 && (
          <>
            <button
              onClick={()=>{
                if(songId !==data?.id){
                    playSong(data?.id , data,idx)
                    setAllData(all)
                }else{
                    stopSong()
                }
              }}
              className="mt-2 flex items-center gap-1 text-white text-sm flex justify-center items-center bg-green-500 hover:bg-green-600 px-3 py-1 rounded shadow"
            >
             {
                songId !==data?.id ? "Play": "Pause"
             }
            </button>

          </>
        )}
      </div>
    </div>
  )
}

export default Music
