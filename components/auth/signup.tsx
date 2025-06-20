"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function SignUp({ setView }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationRequired, setConfirmationRequired] = useState(false);

  const supabase = createBrowserSupabaseClient();
  const signupMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/signup/confirm",
        },
      });
      if (data) {
        setConfirmationRequired(true);
      }
      if (error) {
        alert(error.message);
      }
    },
  });
  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        type: "signup",
        email,
        token: otp,
        options: {},
      });
      if (data) {
        setConfirmationRequired(true);
      }
      if (error) {
        alert(error.message);
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
        <img src={"/images/inflearngram.png"} className="w-60 mb-6" />
        {confirmationRequired ? (
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            label="otp"
            className="w-full rounded-sm"
            placeholder="Type 6 digit of OTP number "
          />
        ) : (
          <>
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
          </>
        )}

        <Button
          onClick={() => {
            if (confirmationRequired) {
              verifyOtpMutation.mutate();
            } else {
              signupMutation.mutate();
            }
          }}
          loading={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signupMutation.isPending
          }
          disabled={confirmationRequired
              ? verifyOtpMutation.isPending
              : signupMutation.isPending}
          color="light-blue"
          className="w-full text-md py-1"
        >
          {confirmationRequired ? "Verify" : "Sign Up"}
        </Button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
        You have already an account?{" "}
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => {
            setView("Sign In");
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
