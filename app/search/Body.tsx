"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { VscLoading } from 'react-icons/vsc'
import Music from './Music'
import {useData} from '../Zustnd/TotalData'

const Body = () => {
    const searchParam = useSearchParams()
    const q = searchParam.get('q')

    const navigate = useRouter()

    if(!q) {
        navigate.back()
    }

    const [data, setdata] = useState<any>([{}])
    const [Loading, setLoading] = useState(true)

    const {setData} = useData()

    useEffect(()=>{
        fetch(`https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=${q}&limit=40`)
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
    },[q])


     if (Loading)
        return (
          <div className=" p-4 rounded m-2 flex justify-center items-center min-h-44">
            <VscLoading className="text-4xl animate-spin" />
          </div>
        )
    
  return (
    <div className='p-4 '>
      <div className='text-md md:text-lg'>
        <b>Search For </b> : {q}
      </div>
      <div className='flex justify-center items-center gap-2 flex-wrap py-4'>
            {
                data?.map((itm:any,idx:number)=>{
                    return <Music idx={idx} key={idx} data={itm}/>
                })
            }
      </div>
    </div>
  )
}

export default Body
