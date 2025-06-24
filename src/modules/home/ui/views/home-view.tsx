"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";

export default function HomeView() {
    const router = useRouter();
  const {data:session} = authClient.useSession();

  if(!session) {
    return(
      <p>Loading..</p>
    )
  }

     return (
      <div className="flex flex-col gap-y-10"> 
        <h1>hello {session.user?.name}</h1>
        <Button onClick={() => authClient.signOut({
      fetchOptions: {
        onSuccess : () => void router.push("/sign-in")
      
         }
        })}>
        Sign out
      </Button>
      
      </div>
    ) 

}
