"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";


export default function Home() {
  const {data:session} = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onSubmit = async () => {
  authClient.signUp.email({
    email,
    password,
    name  
  },{
    onError: (e) => {
      console.log(e);
      window.alert("something went wrong");
    },
    onSuccess: () => {
      window.alert("success");
    }
  })
  };

  const onLogin = async () => {
    authClient.signIn.email({
      email,
      password
    })
  }

  if(session) {
    return (
      <div className="flex flex-col gap-y-10"> 
        <h1>hello {session.user?.name}</h1>
        <button onClick={() => authClient.signOut()}>Sign out</button>
      
      </div>
    )
  }else{
   router.push("/sign-in")
  }


}
