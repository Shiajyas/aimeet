"use client";
import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FaGoogle,FaGithub} from "react-icons/fa"
import{
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { OctagonAlertIcon } from "lucide-react";
import {useForm} from "react-hook-form"

import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(1,{message:"Name is required"}),
    email: z.string().email(),
    password: z.string().min(6,{message:"Password must be at least 6 characters"}),
    confirmPassword: z.string().min(6,{message:"Password must be at least 6 characters"}),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })


export const SignUpView = () => {
    const router = useRouter();
    const [error,setError] = useState<string|null>(null)
    const [pending,setPending] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "" ,
        },
    })

    const onSocial = (provider: "google" | "github") => {
       setError(null)
       setPending(true)
         authClient.signIn.social({
           provider: provider,
           callbackURL: "/"
         },
        {
            onSuccess: () => {
                setPending(false)
            },
            onError: (e) => {
               setPending(false)
                setError(e.error.message)
            }
        }
        )
      
    }
    
        const onSubmit = (data: z.infer<typeof formSchema>) => {
       setError(null)
       setPending(true)
         authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: "/"
         },
        {
            onSuccess: () => {
                setPending(false)
                router.push("/")
                
            },
            onError: (e) => {
               setPending(false)
                setError(e.error.message)
            }
        }
        )
      
    }
    return (
        <div className="flex flex-col gap-6">
       <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
               <form 
               onSubmit={form.handleSubmit(onSubmit)}
               action=""
                className="p-6 md:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-semibold">
                          Let&apos; get started
                        </h1> 
                        <p className="text-muted-foreground text-balance">
                          Create your account
                        </p>
                    </div>
                    <div className="grid gap-3">
                             <FormField 
                        control={form.control}
                        name="name"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="John Doe"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage /> 
                          </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="T@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage /> 
                          </FormItem>
                        )}
                        />
                        <div className="grid gap-3">
                                <FormField 
                        control={form.control}
                        name="password"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="******"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                        />
                        </div>
                       <div className="grid gap-3">
                                <FormField 
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="******"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                        />
                        </div>
                      
                    </div>
                    {!!error && (
                        <Alert className="bg-destructive/10 border-none">
                          <OctagonAlertIcon  className="h-4 w-4 !text-destructive" />
                          <AlertTitle>{error}</AlertTitle>
                        
                        </Alert>
                    )}
                      <Button 
                             disabled={pending}
                             type="submit"
                             className="w-full">
                          Login
                        </Button>

                        <div className="after:border-border relative text-center  text-sm after:absolute
                        after:inset-0 after:top-1/2 after:-z-10 after:flex after:items-center after:border">
                          <span className="bg-card text-muted-foreground relative z-10 px-2">
                            Or continue with
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Button type="button"
                           onClick={() => onSocial("google")}
                           variant="outline"
                           className="w-full hover:bg-purple-200"
                           >
                            <FaGoogle className="mr-2 h-4 w-4" />
                          </Button>
                         <Button 
                        type="button" 
                        onClick={() => onSocial("github")}
                        variant="outline"
                        className="w-full hover:bg-purple-200"
                        >
                        <FaGithub className="mr-2 h-4 w-4" />
                        </Button>
                        
                        </div>
                          <div className="text-center text-sm">
                               Already have an account? <Link href="/sign-in" className="underline underline-offset-4 hover:text-primary">Sign In</Link>
                               
                          </div>
                  </div>
             </form>
          </Form>
           <div className="bg-radial from-blue-500 to-cyan-500 relative hidden md:flex flex-col gap-y-4 items-center justify-center  ">
            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
           <p className="text-2xl font-semibold text-white">
                Ai.meet
           </p>
           </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance
        *:[a]:underline *:[a]:underline-offset-4 "
        >
            By clicking continue, you agree to our <Link href="#" className="underline underline-offset-4">Terms of Service</Link> and <Link href="" className="underline underline-offset-4">Privacy Policy</Link>
        </div>
        </div>
 
    )
}