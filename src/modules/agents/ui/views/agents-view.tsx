"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { LoadingState } from "@/components/ui/loading-state"
import { ErrorState } from "@/components/ui/error-state"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { EmptyState } from "../components/empty-state"

export default function AgentsView() {
    const trpc = useTRPC()
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    console.log(data)

    return(
        <div className="flex-1 flex flex-col pb-4 px-4 md:px-8 gap-y-4">
         
        <DataTable data={data} columns={columns} />
    
        {
            data.length === 0 && (
                <EmptyState
                title="Create your first agent"
                description="Create an agent to join your meetings. Each agent will follow your instructions and can intrect with participants during the call"
                />
            )
        }
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