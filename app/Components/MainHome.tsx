"use client"
import React, { useEffect, useState } from 'react'
import { useHome } from '../Zustnd/HomePage'
import { getSingersByMood } from '../Components/func'
import { useData } from '../Zustnd/TotalData'
import Music from '../search/Music'

const MainHome = () => {
  const { loadingPage, mood, location } = useHome()

  const [mySingers, setMySingers] = useState<string[]>([])
  const [selectedSinger, setSelectedSinger] = useState<string>('')

   const [data, setdata] = useState<any>([{}])
    const [Loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loadingPage && mood) {
      const data = getSingersByMood(mood)
      setMySingers(data)
      setSelectedSinger(data[0]) // default selected singer
    }
  }, [loadingPage, mood])

  const {setData} = useData()

  useEffect(()=>{
    if(selectedSinger && !loadingPage){
             fetch(`https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=${selectedSinger}&limit=40`)
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            setdata(data?.data?.results)
            setData(data?.data?.results)
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            setLoading(false)
        })
    }
  },[selectedSinger])

  if (loadingPage) return null

  return (
    <div className="p-4 ">
      {!location && (
        <div className="flex justify-center items-center h-32 text-gray-600 text-center">
          Location Not Detected. Search To Listen Music
        </div>
      )}

      {location && (
        <div className="">
          <div className="flex flex-row justify-between items-center w-full">
            <span className="font-semibold text-gray-800 ">
              Recommended Music:
            </span>
            <select
              value={selectedSinger}
              onChange={(e) => setSelectedSinger(e.target.value)}
              className=" border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {mySingers.map((itm, idx) => (
                <option key={idx} value={itm}>
                  {itm}
                </option>
              ))}
            </select>
          </div>

          {/* Show selected singer below */}
          {selectedSinger && !Loading && (
            <div className='flex justify-center items-center gap-2 flex-wrap py-4'>
            {
                data?.map((itm:any,idx:number)=>{
                    return <Music idx={idx} key={idx} data={itm}/>
                })
            }
      </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MainHome
