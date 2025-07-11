import "./globals.css";
import { Figtree } from "next/font/google";


import getSongsByUserId from "../../actions/getSongsByUserId";
import Sidebar from "../components/Sidebar";
import ToasterProvider from "@/providers/ToasterProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import Player from "@/components/Player";

const font = Figtree({subsets:["latin"]})

export const metadata={
  title:"Spotify Clone",
  description:"Listen to music",
}

export const revalidate=0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
