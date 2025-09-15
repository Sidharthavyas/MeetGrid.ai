"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon,XCircleIcon } from "lucide-react"
import { NewMeetingDialog } from "./new-meeting-dialog"
import { useState } from "react"
import { MeetingsSearchFilter } from "./meetings-search-filters"
import { StatusFilter } from "./status-filter"
import { AgentIdFilter } from "./agent-id-filter"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { ScrollBar } from "@/components/ui/scroll-area"

export const MeetingsListHeader = ()=>{
    const[filters,setFilters]=useMeetingsFilters();
    const[isDialogopen,SetIsDialogOpen]=useState(false);
    const isAnyFilterModified = 
    !!filters.status || !!filters.search || !!filters.agentId

    const onClearFilters = ()=>{
        setFilters({
            status:null,
            agentId:"",
            search:"",
            page:1
        })
    }
    return (
       <>
       <NewMeetingDialog open={isDialogopen} onOpenChange={SetIsDialogOpen}/>
        <div className="py-5 px-5 md:px-8 flex flex-col gap-y-5 ">
            <div className="flex items-center justify-between">
            <h5 className="font-medium text-xl">My Meeting</h5>
            <Button className="btn-primary" onClick={()=>SetIsDialogOpen(true)}>
                <PlusIcon/>
               New Meeting 
            </Button>
            </div>

             <ScrollArea className="w-full max-w-full overflow-x-auto">
                   <div className="flex items-center gap-x-2 p-1">
                    <MeetingsSearchFilter />
                    <StatusFilter/>
                    <AgentIdFilter/>
                    {isAnyFilterModified &&(
                        <Button variant="outline" onClick={onClearFilters} className="btn-primary"> 
                        <XCircleIcon className="size-4"/>
                            Clear
                        </Button>
                    )}
                </div>
                <ScrollBar orientation="horizontal"/>
             </ScrollArea>
        </div>
       </> 

    )
}