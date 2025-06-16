import LogoutButton from "components/logout-button";
import Image from "next/image";
import { createServerSupabaseClient } from "utils/supabase/server";

export const metadata = {
  title: 'instagrham',
  descriptsion: 'instagram practice',
}

export default async function Home() {
  const supabase = await createServerSupabaseClient()
  const {data:{session}} = await supabase.auth.getSession()

  return (
    <main className="w-full h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="font-bold text-xl">Wecome {session?.user?.email?.split('@')?.[0]}!</h1>
      <LogoutButton />
    </main>
      
        
  );
}
