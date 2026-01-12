'use client'

import React, { Suspense } from 'react'
import Body from './Body'
import { VscLoading } from 'react-icons/vsc'

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="p-4 flex justify-center items-center min-h-44">
          <VscLoading className="text-4xl animate-spin" />
        </div>
      }
    >
      <Body />
    </Suspense>
  )
}

export default Page
