import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { agentsInsertSchema } from "../../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import{toast }from "sonner"
import{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

interface AgentFormProps{
    onSuccess?:()=>void;
    onCancel?:()=>void;
    initialValues:AgentGetOne
}
export const AgentForm = 
({
    onSuccess,
    onCancel,
    initialValues,
}:AgentFormProps) =>{
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess:async()=>{
              await   queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                );
                // TODO:Invalidate Free Tier 
                onSuccess?.();
            },
            onError:(error)=>{
                toast.error(error.message);

                // TODO :Check if error code is "Forbidden",redierct to /upgrade

            }
        })
    )
    const UpdateAgent = useMutation(
        trpc.agents.update.mutationOptions({
            onSuccess:async()=>{
              await   queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                );
                if(initialValues?.id){
                    queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id:initialValues.id}),
        )
                }onSuccess?.();
            },
            onError:(error)=>{
                toast.error(error.message);

                // TODO :Check if error code is "Forbidden",redierct to /upgrade

            }
        })
    )
    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver:zodResolver(agentsInsertSchema),
        defaultValues:{
            name:initialValues?.name??"",
            instructions:initialValues?.instructions??""
        }
    })
    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending || UpdateAgent.isPending;
    const onSubmit = (values:z.infer<typeof agentsInsertSchema>)=>{
        if(isEdit){
            UpdateAgent.mutate({...values,id:initialValues.id})
            
        }else{
            createAgent.mutate(values)
        }
    }
    return (
        <Form {...form} >
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar 
                seed={form.watch("name")}
                variant="botttsNeutral"
                className="border size-16"
                />
                <FormField 
                name= "name"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel> Name</FormLabel>
                        <FormControl>
                            <Input {...field}
                            placeholder="e.g YourAIHelper"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField 
                name= "instructions"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel> Instructions</FormLabel>
                        <FormControl>

                            <Textarea {...field}
                            placeholder="You are a helpful AI assistant that can adapt to different needs (e.g., math, coding, writing, research, or general tasks)."/>
                        </FormControl>
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
    )
}
