"use client"

import MediaItem from "../../../components/MediaItem";
import { Song } from "../../../../types";
import LikeButton from "@/components/LikedButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps{
  songs:Song[];
}

const SearchContent =({
  songs
}:SearchContentProps)=>{

  const onPlay = useOnPlay(songs);

  if(!songs || songs.length === 0){
    return(
      <div
        className="flex flex-col gap-y-2 w-full px-6 text-neutral-400"
      >
        No songs found.
      </div>
    )
  }

  return(
    <div className="flex flex-col gap-2 w-full px-6">
      {songs.map((song)=>(
        <div
          key={song.id}
          className="flex items-centergap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem 
              onClick={(id:string)=>{onPlay(id)}}
              data={song}
            />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default SearchContent;