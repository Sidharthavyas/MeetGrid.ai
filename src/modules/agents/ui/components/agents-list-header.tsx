"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NewAgentDialog } from "./new-agent-dialog"
import { useState } from "react"

export const AgentsListHeader = ()=>{
    const[isDialogopen,SetIsDialogOpen]=useState(false)
    return (
       <>
       <NewAgentDialog  open={isDialogopen} onOpenChange={SetIsDialogOpen}/>
        <div className="py-5 px-5 md:px-8 flex flex-col gap-y-5 ">
            <div className="flex items-center justify-between">
            <h5 className="font-medium text-xl">My Agents</h5>
            <Button className="btn-primary" onClick={()=>SetIsDialogOpen(true)}>
                <PlusIcon/>
               New Agent 
            </Button>
            </div>

        </div>
       </> 

    )
}