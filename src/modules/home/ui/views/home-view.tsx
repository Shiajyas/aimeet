"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

export default function HomeView() {

  const trpc = useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text: "philips"}));

     return (
      <div className="flex flex-col gap-y-10"> 
        {data?.greeting}
      </div>
    ) 

}
