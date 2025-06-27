"use client";
import { Button, Spinner } from "@material-tailwind/react";
import Person from "./Peoson";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import {
  selectedUserIdState,
  selectedUserIndexState,
} from "utils/recoil/atoms";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllMessages, getUserById, sendMessage } from "actions/chatActions";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function ChatScreen({}) {
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserIndex = useRecoilValue(selectedUserIndexState);
  const [message, setMessage] = useState("");
  const supabase = createBrowserSupabaseClient()

  const selectedUserQuery = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      return sendMessage({
        message,
        chatUserId: selectedUserId,
      });
    },
    onSuccess: () => {
      setMessage("");
      getAllMessageQuery.refetch();
    },
  });

  const getAllMessageQuery = useQuery({
    queryKey: ["mesaages", selectedUserId],
    queryFn: () => getAllMessages({ chatUserId: selectedUserId }),
  });

  useEffect(()=>{
    const channel = supabase.channel('message_postgres_changes')
    .on('postgres_changes',
      {event:'INSERT',
        schema:'public',
        table:'message'
      },
      (payload) =>{
        if (payload.eventType === 'INSERT' && !payload.errors)
        {getAllMessageQuery.refetch()}}
    )
    .subscribe()
    return ()=>{
      channel.unsubscribe()
    }
  },[])

  return selectedUserQuery.data !== null ? (
    <div className="w-full h-screen flex flex-col">
      <Person
        index={selectedUserIndex}
        isActive={false}
        name={selectedUserQuery.data?.email?.split("@")?.[0]}
        onChatScreen={true}
        onlineAt={new Date().toISOString()}
        userId={selectedUserQuery.data?.id}
      />
      <div className="w-full overflow-y-scroll flex-1 flex flex-col p-4 gap-3">
        {getAllMessageQuery.data?.map((message) => (
          <Message
            key={message.id}
            message={message.message}
            isFromMe={message.receiver === selectedUserId}
          />
        ))}
      </div>

      <div className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 w-full border-2 border-light-blue-600"
          placeholder="Type messages"
        />
        <button
          onClick={() => sendMessageMutation.mutate()}
          className="min-w-20 p-3 bg-light-blue-700 text-white"
          color="light-blue"
        >
          {sendMessageMutation.isPending ? <Spinner /> : <span>Send</span>}
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
