'use client'

import { usePlayData } from "../Zustnd/player"
import Player from "./Player"

const MusicPlayer = () => {

    const {data, stopSong, playSong,isPlaying} = usePlayData()

    if(!isPlaying){
        return null
    }
  return <>
     <Player/>
  </>
}

export default MusicPlayer
