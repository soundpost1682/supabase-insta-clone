import LogoutButton from "components/logout-button";
import Image from "next/image";

export const metadata = {
  title: 'instagrham',
  descriptsion: 'instagram practice',
}

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="font-bold text-xl">Wecome {'miru'}!</h1>
      <LogoutButton />
    </main>
      
        
  );
}
