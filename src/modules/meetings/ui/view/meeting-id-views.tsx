"use client"
import { Errorstate } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meetings-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog copy";
import { useState } from "react";

interface Props{
    meetingId:string,
};

export const MeetingIdView=({meetingId}:Props)=>{
    const router  = useRouter();
    const queryClient=useQueryClient();
    const trpc=useTRPC();
    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)
    const[RemoveConfirmation,confirmRemove]=useConfirm(
        "Are You Sure ?",
        "The Following action will be remove this meeting"
    )
    const{data}=useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({id:meetingId})
    );
    const removeMeeting=useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess:()=>{
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
                router.push("/meetings")
            }
          
        })
    );
    const handleRemoveMeeting=async()=>{
        const ok = await confirmRemove();
        if(!ok) return;
        await removeMeeting.mutateAsync({id:meetingId})
    }
    return(
    <>
    <RemoveConfirmation/>
    <UpdateMeetingDialog open={updateMeetingDialogOpen}
    onOpenChange={setUpdateMeetingDialogOpen}
    initalValues={data}
      />
    <div className="flex-1 py-4 px-4 md:px-8 flex-col flex gap-y-4">
        <MeetingIdViewHeader 
         meetingId={meetingId}
         meetingName={data.name}
         onEdit={()=>setUpdateMeetingDialogOpen(true)}
         onRemove={handleRemoveMeeting}
         />
        {JSON.stringify(data,null,2)}

    </div>
    </>
    )
}
export const MeetingsIdViewLoading = ()=>{
    return(
        <LoadingState
        title="Loading Meetings"
        description="This may take a few Seconds!!"
        />
    )
}

export const MeetingsIdViewError = ()=>{
    return(
        <Errorstate
        
              title = "Error Loading Meetings"
            description="Something Went Wrong"
        />
       
    
    )
}