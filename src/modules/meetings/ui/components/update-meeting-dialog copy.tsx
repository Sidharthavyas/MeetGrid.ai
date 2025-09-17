import { ResponsiveDialog } from "@/components/responsive-dialog";

import{MeetingForm} from "./meeting-form"
import { MeetingsGetOne } from "../view/types";

interface UpdateMeetingDialogProps{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    initalValues:MeetingsGetOne
}
export const UpdateMeetingDialog = ({open,onOpenChange,initalValues}:UpdateMeetingDialogProps)=>{
    return(
        <ResponsiveDialog
        title="Edit Meeting"
        description="Edit the Meeting details"
        open={open}
        onOpenChange={()=>onOpenChange}
        >
            <MeetingForm
            onSuccess={()=>{onOpenChange(false)}}
            onCancel={()=>onOpenChange(false)}
            initialValues={initalValues}
            />
            
        </ResponsiveDialog>
    )
}