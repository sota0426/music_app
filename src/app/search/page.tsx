"use client"

import Header from "@/components/Header";
import getSongsByTitle from "../../../actions/getSongsByTitle";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Song } from "../../../types";

const Search = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const result = await getSongsByTitle(title);
      setSongs(result);
    };

    fetchSongs();
  }, [title]);


  return(
    <div
      className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  )
}


export default Search;