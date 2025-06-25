'use client'
import { Button } from "@material-tailwind/react";
import Person from "./Peoson";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import { selectedUserIdState, selectedUserIndexState } from "utils/recoil/atoms";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "actions/chatActions";

export default function ChatScreen({}) {
  const selectedUserId = useRecoilValue(selectedUserIdState)
  const selectedUserIndex = useRecoilValue(selectedUserIndexState)
  const selectedUserQuery = useQuery({
    queryKey : ['user', selectedUserId],
    queryFn : ()=>getUserById(selectedUserId)
  })
  


  return selectedUserQuery.data !== null? (
    <div className="w-full h-screen flex flex-col">
      <Person
        index={selectedUserIndex}
        isActive={false}
        name={selectedUserQuery.data?.email?.split("@")?.[0]}
        onChatScreen={true}
        onlineAt={new Date().toISOString()}
        userId={selectedUserQuery.data?.id}
      />
      <div className="w-full flex-1 flex flex-col p-4 gap-3">
        <Message
        isFromMe={true}
        message={'hihello'}
        />
        <Message
        isFromMe={false}
        message={'nice to meet you'}
        />
        <Message
        isFromMe={true}
        message={'qweasddddddddddddddddddddddddddddd'}
        />
        <Message
        isFromMe={false}
        message={'q3qwse5654654asdasd'}
        />

      </div>
      
      
      <div className="flex">
        <input className="p-3 w-full border-2 border-light-blue-600"
        placeholder="Type messages"
        />
        <button 
        className="min-w-20 p-3 bg-light-blue-700 text-white"
        color="light-blue">Send</button>
        

      </div>
    </div>
  ):
  <div className="w-full"></div>
}
