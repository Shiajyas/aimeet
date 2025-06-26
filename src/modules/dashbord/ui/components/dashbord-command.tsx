"use client"

import { CommandDialog, CommandItem, CommandList } from "@/components/ui/command"
import { CommandInput } from "@/components/ui/command"
import { Dispatch,SetStateAction } from "react"

interface Props{
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const DashbordCommand = ({open, setOpen}: Props)=>{

    return(
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput 
            placeholder="find a meeting or agent"
            />
            <CommandList>
                <CommandItem>
                    test
                </CommandItem>
            </CommandList>
        </CommandDialog>
    )
}