"use client"

import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { Song } from "../../types";
import LikedButton from "./LikedButton";
import MediaItem from "./MediaItem";
import {  AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { RxSpeakerLoud,  RxSpeakerOff } from "react-icons/rx";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import toast from "react-hot-toast";

interface PlayerContentProps{
  song:Song;
  songUrl : string
}

const PlayerContent =({
  song,
  songUrl
}:PlayerContentProps)=>{
  const player = usePlayer();
  const [volume , setVolume ]=useState(1);
  const [isPlaying , setIsPlaying] = useState(false);

  const Icon = isPlaying ? TbPlayerPlayFilled : TbPlayerPauseFilled
  const VolumeIcon = volume === 0 ? RxSpeakerOff : RxSpeakerLoud

  const onPlayNext =()=>{
    if(player.ids.length === 0 ){
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id===player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if(!nextSong){
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  }

  const onPlayPrevious =()=>{
    if(player.ids.length === 0 ){
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id===player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if(!previousSong){
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  }

  const [play , {pause , sound}]=useSound(
    songUrl , 
    {
      volume:volume,
      onplay:()=> setIsPlaying(true),
      onend:()=>{
        setIsPlaying(false);
        onPlayNext();
      },
      onpause:()=>setIsPlaying(false),
      format:["mp3"]
    }
  );

  useEffect(()=>{
    sound?.play();

    return()=>{
      sound?.unload();
    }
  },[sound])

  
  const handlePlay = ()=>{
    if(!isPlaying){
      play();
    }else{
      pause();
    }
  }

  const toggleMute =()=>{
    if(volume === 0 ){
      setVolume(1);
    }else{
      setVolume(0)
    }
  }


  return(
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikedButton  songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto justify-end items-center">
        <div
          onClick={handlePlay} 
          className="h-10 w-10 items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward 
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon 
            size={30}
            className="text-black"
          />
        </div>
      <AiFillStepForward 
        onClick={onPlayNext}
        size={30}
        className="text-neutral-400 cursor-pointer hover:text-white transition"
      />
      </div>

      <div className="hidden md:flex w-full jusfy-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon 
            onClick={toggleMute}
            className="cursor-pointer"
            size={30}
          />
          <Slider 
            value={volume}
            onChange={(value)=>{setVolume(value)}}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent;