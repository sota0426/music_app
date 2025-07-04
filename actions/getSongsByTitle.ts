//src\app\actions\getSongsByTitle.ts

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../types";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitle = async(title:string):Promise<Song[]>=>{
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore
  });

  if(!title){
    const allsongs = await getSongs();
    return allsongs;
  }


  const {data , error} = await supabase
    .from("songs")
    .select("*")
    .ilike("title",`%${title}%`)
    .order("created_at",{ascending:false});

    if(error){
      console.log(error)
    }

    return (data as any) || [];
}

export default getSongsByTitle;
