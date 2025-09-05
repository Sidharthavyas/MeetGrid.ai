"use client";
import{Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
export default function Home(){
  
    const { data: session} = authClient.useSession() 

  const[email,SetEmail]=useState("")
  const[name,SetName]=useState("")
  const[password,SetPassword]=useState("")
  const onSubmit =()=>{
    authClient.signUp.email({
      email,
      name,
      password,
    },{
      onError:()=>{
        window.alert("Something went wrong")
      },
      onSuccess:()=>{
        window.alert("Success")
      }
    });
  }
  const onLogin =()=>{
    authClient.signIn.email({
      email,
      password,
    },{
      onError:()=>{
        window.alert("Something went wrong")
      },
      onSuccess:()=>{
        window.alert("Success")
      }
    });
  }
 if(session){
  return(
    <div className="flex  flex-col p-4 gap-y-4">
      <p>Logged in as {session.user.name}</p>
      <Button onClick={()=> authClient.signOut()}>
        Sign Out 
      </Button>
    </div>
  )
 }
  return(

<div className="flex flex-col  gap-y-10 ">
      <div className="p-4  flex gap-y-4 flex-col ">
      <Input placeholder="name" value={name} onChange={(e)=>SetName(e.target.value)}/>
      <Input placeholder="email"  value={email} onChange={(e)=>SetEmail(e.target.value)}/>
      <Input placeholder="password" type="password"  value={password} onChange={(e)=>SetPassword(e.target.value)}/>
      <Button
      onClick={onSubmit} 
      >Create User</Button>
      
        <div className="p-4  flex gap-y-4 flex-col ">
      <Input placeholder="email"  value={email} onChange={(e)=>SetEmail(e.target.value)}/>
      <Input placeholder="password" type="password"  value={password} onChange={(e)=>SetPassword(e.target.value)}/>
      <Button
      onClick={onLogin} 
      >Login</Button>
    </div>
    </div>
</div>
  )
}