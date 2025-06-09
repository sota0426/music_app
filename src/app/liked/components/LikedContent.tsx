"use client"

import { useRouter } from "next/navigation";
import { Song } from "../../../../types";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import MediaItem from "@/components/MediaItem";
import LikedButton from "@/components/LikedButton";

interface LikedContentProps{
  songs:Song[];
}

const LikedContent =({
  songs
}:LikedContentProps)=>{
    const router =useRouter();
    const {isLoading , user} = useUser();

    useEffect(()=>{
      if(!isLoading && !user){
        router.replace("/");
      }
    },[isLoading , user , router])

    if(songs.length === 0){
      return(
        <div
          className="flex flex-col gap-y-2 text-2xl w-full px-6 text-neutral-400"
        >
          No liked Songs.
        </div>
      )
    }

  return(
    <div 
      className="flex flex-col gap-y-2 w-full  p-6"
    >
      {songs.map((song)=>(
        <div
          key={song.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem 
              onClick={()=>{}}
              data={song}
            />
          </div>
          <LikedButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default LikedContent;