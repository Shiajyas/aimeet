import { useTRPC } from "@/trpc/client";

import { AgentGetOne } from "../../types";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GenratedAvatar } from "@/components/ui/genrated-avatar";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne
}

export const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
    const trpc = useTRPC()
    const router = useRouter()
    const queryClient = useQueryClient()

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
               await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());
                
                if(initialValues?.id){
                  await  queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValues.id })
                    );
                }   
                 onSuccess?.();
            },
           
            onError: (error) => {
                toast.error(
                    `Failed to create agent: ${error.message || "Something went wrong"}`
                );
                //Todo: check if error code is FORBIDDEN and redirect to "/upgrade" page
            },
        })
    );
   
    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name || "",
            instructions: initialValues?.instructions || "",
        },
    })

    const isEdit = !!initialValues?.id
    const isPending = createAgent.isPending
    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) =>{
      if(isEdit){
     console.log("Editing agent", values);
     

      }else{
        createAgent.mutate(values)
      }
    
    }

    return(
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <GenratedAvatar
             seed={form.watch("name")}
             variant= "botttsNeutral"
             className="border size-16"
            />
            <FormField 
            name="name"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input  placeholder="Math tutor" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
                <FormField 
            name="instructions"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                        <Textarea
                          placeholder="you are a helper bot that helpful that can answer questions help with tasks and more"
                         {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <div className="flex  justify-between gap-x-2">
                {onCancel && (
                    <Button variant="outline" type="button" disabled={isPending} onClick={onCancel} >
                        Cancel
                        </Button>
                )}

                <Button disabled={isPending} type="submit" className="ml-2">
                    {isPending ? "Saving..." : isEdit ? "Update Agent" : "Create Agent"}
                </Button>
           
            </div>
            </form>
        </Form>
    )
};