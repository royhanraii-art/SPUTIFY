import { create } from 'zustand'

export const useHome = create((set) => ({
  mood:'',
  loadingPage:true,
  location:true,
  setLoadingPage:(data)=>(set({loadingPage:data})),
  setmood:(data)=>(set({mood:data})),
  setlocation:(data)=>(set({location:data}))
}))
