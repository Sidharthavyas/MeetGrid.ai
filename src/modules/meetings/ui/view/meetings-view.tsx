"use client";

import { Errorstate } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView=()=>{
    const trpc=useTRPC();
    const {data}=useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
    return(
        <div>
      
        </div>
    )

}




export const MeetingsViewLoading = ()=>{
    return(
        <LoadingState
        title="Loading Meetings"
        description="This may take a few Seconds!!"
        />
    )
}

export const MeetingsViewError = ()=>{
    return(
        <Errorstate
        
              title = "Error Loading Meetings"
            description="Something Went Wrong"
        />
       
    
    )
}