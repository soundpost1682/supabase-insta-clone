"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function SignIn({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createBrowserSupabaseClient()
  const signInMutation = useMutation({
    mutationFn:async ()=>{
      const {data, error}= await supabase.auth.signInWithPassword({
        email, password
      })
      if (data){
        console.log(data)
      }
      if (error){
        alert(error.message)
      }
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
        <img src={"/images/inflearngram.png"} className="w-60 mb-6" />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="email"
          className="w-full rounded-sm"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="password"
          className="w-full rounded-sm"
        />
        <Button
          onClick={() => {
            signInMutation.mutate()
          }}
          loading={signInMutation.isPending}
          disabled={signInMutation.isPending}
          color="light-blue"
          className="w-full text-md py-1"
        >
          Log In
        </Button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
        You have no account?{" "}
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => {
            setView("Sign In");
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
