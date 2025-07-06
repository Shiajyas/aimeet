"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { is } from "drizzle-orm"
import { LoadingState } from "@/components/ui/loading-state"
import { ErrorState } from "@/components/ui/error-state"

export default function AgentsView() {
    const trpc = useTRPC()
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions())


    return(
        <div>
            {JSON.stringify(data, null, 2)} 
        </div>
    )

}

export const AgentsViewLoading = () => {
    return(
        <LoadingState title="Loading agents" description="This might take a while" />
    )
}

export const AgentsViewError = () => {
    return(
        <ErrorState title="Error loading agents" description="Something went wrong" />
    )
}