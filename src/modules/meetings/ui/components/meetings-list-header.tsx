"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { NewMeetingDialog } from "./new-meeting-dialog"
import { useState } from "react"

export const MeetingsListHeader = ()=>{
    const[isDialogopen,SetIsDialogOpen]=useState(false)
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
          
                <div className="flex items-center gap-x-2 p-1">
                    

                </div>
        </div>
       </> 

    )
}