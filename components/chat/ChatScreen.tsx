'use client'
import { Button } from "@material-tailwind/react";
import Person from "./Peoson";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import { selectedIndexState } from "utils/recoil/atoms";
import { useEffect } from "react";

export default function ChatScreen() {
  const selectedIndex = useRecoilValue(selectedIndexState)
  


  return selectedIndex !== null? (
    <div className="w-full h-screen flex flex-col">
      <Person
        index={selectedIndex}
        isActive={false}
        name={"miru"}
        onChatScreen={true}
        onlineAt={new Date().toISOString()}
        userId={"isdaoij"}
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
