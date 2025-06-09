"use client"

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import useAuthModal from "../src/hooks/useAuthModal"
import { useUser } from "../src/hooks/useUser"
import useUploadModal from "../src/hooks/useUploadModal"
import MediaItem from "./MediaItem"
import { Song } from "../types"

interface Libraryprops{
    songs:Song[];
}

const Library:React.FC<Libraryprops>=({
    songs
})=>{
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const {user} = useUser();

    const onclick=()=>{
        if(!user){
            return authModal.onOpen();
        }

        //tODO:check for subscription
        return uploadModal.onOpen();
    }

    return(
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist 
                        className="text-neutral-400"
                        size={26}
                    />
                    <p className="text-neutral-400 font-medium text-md">
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus 
                    onClick={onclick}
                    size={20}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
                </div>
                <div
                    className="flex flex-col gap-y-2 mt-4 px-3"
                >
                    {songs.map((item)=>(
                        <MediaItem 
                            onClick={()=>{}}
                            key={item.id}
                            data={item}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Library;