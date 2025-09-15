import { useTRPC } from "@/trpc/client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { meetingsInsertSchema } from "../../schema";
import { Button } from "@/components/ui/button";
import { CommandSelect } from "@/components/command-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeetingsGetOne } from "../view/types";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { GeneratedAvatar } from "@/components/generated-avatar";

import{toast }from "sonner"
import{
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";


interface MeetingFormProps{
    onSuccess?:(id?:string)=>void;
    onCancel?:()=>void;
    initialValues?:MeetingsGetOne
}
export const MeetingForm = 
({
    onSuccess,
    onCancel,
    initialValues,
}:MeetingFormProps) =>{
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false)
    const[agentSearch,setAgentSearch]=useState("");
    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
     
            search:agentSearch,
        })
    )
    const createMeetings = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess:async(data)=>{
              await   queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );
                // TODO:Invalidate Free Tier 
                onSuccess?.(data.id);
            },
            onError:(error)=>{
                toast.error(error.message);

                // TODO :Check if error code is "Forbidden",redierct to /upgrade

            }
        })
    )
    const UpdateMeetings = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess:async(data)=>{
              await   queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );
                if(initialValues?.id){
                    queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({id:initialValues.id}),
        )
                }onSuccess?.(data.id);
            },
            onError:(error)=>{
                toast.error(error.message);

                // TODO :Check if error code is "Forbidden",redierct to /upgrade

            }
        })
    )
    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver:zodResolver(meetingsInsertSchema),
        defaultValues:{
            name:initialValues?.name??"",
            agentId:initialValues?.agentId??""
        }
    })
    const isEdit = !!initialValues?.id;
    const isPending = createMeetings.isPending || UpdateMeetings.isPending;
    const onSubmit = (values:z.infer<typeof meetingsInsertSchema>)=>{
        if(isEdit){
            UpdateMeetings.mutate({...values,id:initialValues.id})
            
        }else{
            createMeetings.mutate(values)
        }
    }
    return (
        <>
        <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog}/>
        <Form {...form} >
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField 
                name= "name"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel> Name</FormLabel>
                        <FormControl>
                            <Input {...field}
                            placeholder="e.g Your AIConsultations"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                />
                 <FormField 
                name= "agentId"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel> Agent</FormLabel>
                        <FormControl>
                            <CommandSelect
                                options={(agents.data?.items ?? []).map((agent) => ({
                                    id: agent.id,
                                    value: agent.id,
                                    children: (
                                    <div className="flex items-center gap-x-2">
                                        <GeneratedAvatar
                                        seed={agent.name}
                                        variant="botttsNeutral"
                                        className="border size-6"
                                        />
                                        <span>{agent.name}</span>
                                    </div>
                                        ),
                                    }))}
                                    onSelect={field.onChange}
                                    onSearch={setAgentSearch}
                                    value={field.value}
                                    placeholder="Select an agent"
                                    />

                        </FormControl>    
                        <FormDescription>
                            Not found what you&apos;re looking for? {""}
                            <Button type="button"  onClick={()=>setOpenNewAgentDialog(true)} 
                            className=" hover:underline text-primary  px-3 ">
                                 Create New Agent

                            </Button>
                            </FormDescription>      
                        <FormMessage/>
                    </FormItem>
                  )}
                />


                <div  className="flex justify-between gap-2  " >
                    {onCancel && (
                        <Button 
                        className="btn-primary"
                        variant="ghost"
                        disabled={isPending}
                        type="button"
                        onClick={()=>onCancel()}>
                            Cancel
                        </Button>

                    )}
                <Button variant="default" disabled={isPending} type="submit" className="btn-primary">
                    {isEdit ? "Update" : "Create"}
                </Button>
                </div>
                

            </form>
        </Form>
        </>
    )
}
