"use client"
import { useIsMobile } from "@/hooks/use-mobile"

import{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import{
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer"


interface ResponsiveDialogProps {
    title: string,
    description: string,
    children: React.ReactNode,
    open: boolean,
    onOpenChange: (open: boolean) => void, 
}


export const ResponsiveDialog = ({title, description, children, open, onOpenChange}: ResponsiveDialogProps) => {
    const isMobile = useIsMobile()
    if(isMobile) {
        return(
            <Drawer open={open} onOpenChange={onOpenChange}>
                {/* <DialogTrigger asChild>
                    {children}
                </DialogTrigger> */}
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        {children}
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* <DialogTrigger asChild>
                {children}
            </DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}