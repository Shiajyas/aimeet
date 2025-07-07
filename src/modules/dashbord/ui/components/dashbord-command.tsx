"use client"

import { CommandRespnsiveDialog, CommandItem, CommandList } from "@/components/ui/command"
import { CommandInput } from "@/components/ui/command"
import { Dispatch,SetStateAction } from "react"

interface Props{
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const DashbordCommand = ({open, setOpen}: Props)=>{

    return(
        <CommandRespnsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput 
            placeholder="find a meeting or agent"
            />
            <CommandList>
                <CommandItem>
                    test
                </CommandItem>
                     <CommandItem>
                    Test2
                </CommandItem>
            </CommandList>
        </CommandRespnsiveDialog>
    )
}