import React, { useState, useRef, useEffect } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import { usePlayData } from '../Zustnd/player'
import { useData } from '../Zustnd/TotalData'
import { BiDownload } from 'react-icons/bi'

const Music = ({ data, idx }: { data: any, idx: number }) => {

  const { songId, playSong, stopSong, setAllData } = usePlayData()

  const { data: all } = useData()

  // Process song name
  const fullText = (data.name || '').replace(/&quot;/g, '"')
  const [song, rawRest] = fullText.split(/\s*\(/, 2)
  const rest = rawRest ? rawRest.replace(/\)$/, '') : ''


const DownloadImage = async () => {
  const url = data.downloadUrl[data.downloadUrl?.length - 1]?.link;

  const response = await fetch(url);
  const blob = await response.blob();

  const blobUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = song + ".mp3";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(blobUrl);
};






  return (
    <div className="sm:w-[16rem] sm:block flex justify-between items-center relative overflow-hidden md:h-[14rem] w-full h-[10rem] rounded-xl shadow-xl bg-gray-800 text-white">
      {/* Song Image */}
      <img
        src={data?.image?.[data?.image.length - 1]?.link}
        alt={song}
        className="sm:w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />

      {/* Overlay */}
      <div className="sm:absolute bottom-0 left-0 right-0 p-2 backdrop-blur-sm h-full w-full sm:h-[8rem] bg-black/50 flex flex-col overflow-clip justify-end">
        <div className="text-xs font-semibold truncate">{song}</div>
        {rest && <div className="text-xs italic text-gray-300 truncate">{rest}</div>}
        {data.year && <div className="text-xs text-gray-200 mt-0.5">Year: {data.year}</div>}
        {data.primaryArtists && <div className="text-xs text-gray-200 mt-0.5">Artists: {data.primaryArtists}</div>}

        {/* Play/Pause Button */}
        {data.downloadUrl?.length > 0 && (
          <div className='flex justify-center  items-center gap-1 h-9 mt-2 md:w-full w-[10rem]'>
            <button
              onClick={() => {
                if (songId !== data?.id) {
                  playSong(data?.id, data, idx)
                  setAllData(all)
                } else {
                  stopSong()
                }
              }}
              className=" flex flex-1 h-full items-center gap-1 text-white text-xs flex justify-center items-center bg-green-500 hover:bg-green-600 px-3 py-1 rounded shadow"
            >
              {
                songId !== data?.id ? "Play" : "Pause"
              }
            </button>
            <button onClick={DownloadImage} className='rounded h-full px-4 bg-gray-700 cursor-pointer flex justify-center items-center p-1'>
              <BiDownload size={'1.3rem'} />
            </button>

          </div>
        )}
      </div>
    </div>
  )
}

export default Music
