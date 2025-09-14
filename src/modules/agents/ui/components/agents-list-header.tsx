"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { NewAgentDialog } from "./new-agent-dialog"
import { useState } from "react"
import { useAgentsFilters } from "@/app/(dashboard)/agents/hooks/use-agents-filters"
import { AgentsSearchFilter } from "./agents-search-filters"
import { DEFAULT_PAGE } from "@/constants"

export const AgentsListHeader = ()=>{
    const[filters,SetFilters]=useAgentsFilters();
    const[isDialogopen,SetIsDialogOpen]=useState(false)
const isAnyFilterModified = !!filters.search
const onClearFilters = ()=>{
    SetFilters({
        search:"",
        page:DEFAULT_PAGE
    })
}
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
            <AgentsSearchFilter/>
                <div className="flex items-center gap-x-2 p-1">
                    
                    {isAnyFilterModified &&(
                        <Button variant="outline" size="sm" onClick={onClearFilters}>
                            <XCircleIcon/>
                            Clear
                        </Button>
                    )}
                </div>
        </div>
       </> 

    )
}