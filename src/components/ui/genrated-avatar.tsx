import { createAvatar } from "@dicebear/core";
import { botttsNeutral,initials } from "@dicebear/collection";

import { cn } from "@/lib/utils";
import {Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";

interface genratedAvatarProps {
    seed:string
    className?:string
    variant?:"botttsNeutral" | "initials"
}


export const GenratedAvatar = ({seed,className,variant}:genratedAvatarProps) => {

    let avatar;

    if(variant === "botttsNeutral"){
        avatar = createAvatar(botttsNeutral,{seed:seed})
    }else if(variant === "initials"){
        avatar = createAvatar(initials,{
            seed:seed,
            fontWeight: 500,
            fontSize: 42
        })

    }

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar?.toDataUri()} alt="avatar" />
            <AvatarFallback >
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}