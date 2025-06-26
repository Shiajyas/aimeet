"use client";
import { useEffect, useState } from "react";

import { PanelLeftClose, PanelLeftIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

import { DashbordCommand } from "./dashbord-command";

export const DashbordNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(()=>{
    const down = (e: KeyboardEvent) => {
        if(e.key === "k" && (e.metaKey || e.ctrlKey)){
            e.preventDefault()
            setCommandOpen((open)=> !open)
        }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  })

  return (
   <>
   <DashbordCommand open={commandOpen} setOpen={setCommandOpen}/>
    <div className="flex items-center gap-x-2 border-b bg-background px-4 py-2">
      {/* Sidebar toggle button */}
      <Button className="size-9" onClick={toggleSidebar} variant="outline">
        {state === "collapsed" || isMobile ? (
          <PanelLeftIcon className="size-4" />
        ) : (
          <PanelLeftClose className="size-4" />
        )}
      </Button>

      {/* Search button with shortcut hint */}
      <Button
        className="flex h-9 w-[240px] items-center justify-start gap-2 font-normal text-muted-foreground"
        variant="outline"
        size="sm"
        onClick={() => {setCommandOpen((open)=> !open)}}
      >
        <SearchIcon className="h-4 w-4" />
        <span>Search</span>

        {/* Shortcut aligned right */}
        <span className="ml-auto">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </span>
      </Button>
    </div>
   </>
  );
};
