// src\actions\getSongs.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../types";
import { cookies } from "next/headers";

const getSongs = async (): Promise<Song[]> => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore
  });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getSongs;