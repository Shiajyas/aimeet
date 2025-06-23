"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";


export default function Home() {
  const {data:session} = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  }

  return (
<div className="flex flex-col gap-y-4">

  <input placeholder="name" 
  className="p-4 flex flex-col gap-y-4 border-b"
  value={name} 
  onChange={(e) => setName(e.target.value)} 
  />

  <input type="email" 
  className="p-4 flex flex-col gap-y-4 border-b"
  placeholder="email" value={email}
  onChange={(e) => setEmail(e.target.value)}
 />

  <input type="password" 
  className="p-4 flex flex-col gap-y-4 border-b"
  placeholder="password" value={password}
  onChange={(e) => setPassword(e.target.value)}
   />

  <Button onClick={onSubmit}>Create User</Button>


  <div className="flex flex-col ">



  <input type="email" 
  className="p-4 flex flex-col gap-y-4 border-b"
  placeholder="email" value={email}
  onChange={(e) => setEmail(e.target.value)}
 />

  <input type="password" 
  className="p-4 flex flex-col gap-y-4 border-b"
  placeholder="password" value={password}
  onChange={(e) => setPassword(e.target.value)}
   />

  <Button onClick={onLogin}>Login</Button>
</div>
</div>

  );
}
