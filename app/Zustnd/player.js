import { create } from 'zustand'

export const usePlayData = create((set) => ({
  isPlaying: false,
  songId: null,
  data: {},
  index:null,

  allData: [],

  setAllData: (allData)=>(set({allData:allData})),

  // Start playing a song
  playSong: (id, songData ,idx) => set({ isPlaying: true,index:idx, songId: id, data: songData }),


  // Stop and clear song
  stopSong: () => set({ isPlaying: false, songId: null, data: {},index:null }),
}))
