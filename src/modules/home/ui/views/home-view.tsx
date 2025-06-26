"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

/**
 * Displays a greeting message fetched from the TRPC backend.
 *
 * Fetches a greeting using a TRPC query with a fixed text parameter and renders the result.
 */
export default function HomeView() {

  const trpc = useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text: "philips"}));

     return (
      <div className="flex flex-col gap-y-10"> 
        {data?.greeting}
      </div>
    ) 

}
