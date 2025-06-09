"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";


interface ListItemProps{
  image:string;
  name:string;
  href?:string;
}

const ListItem:React.FC<ListItemProps> =({
  image,
  name,
  href,
})=>{
  const router = useRouter();
  
  const onClick=()=>{
    //add authentication before push

    router.push(href);
  }

  return(
    <button
      onClick={onClick}
      className="
      relative
      group
      flex
      items-center
      rounded-md
      overflow-hidden
      gap-x-4
      bg-neutral-100/10
      hover:bg-neutral-100/20
      transition
      pr-4"
    >
      <div className="relativemin-h-[64px] min-w-[64px]">
        <Image 
          className="object-cover ml-2"
          src={image}
          alt="Image"
          width={30}
          height={30}
        />
      </div>
      <p className="font-medium truncate py-5">
        {name}
      </p>
      <div className="
        absolute
        transition
        opacity-0
        rounded-full
        justify-center
        items-center
        bg-green-500
        p-4
        drop-shadow-md
        right-5
        group-hover:opacity-100
        hover:scale-110
      ">
        <FaPlay className="text-black" size={15}/>
        
      </div>
    </button>
  )
}

export default ListItem;