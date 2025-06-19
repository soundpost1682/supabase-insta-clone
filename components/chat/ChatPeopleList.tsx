'use client'

import { useState } from "react";
import Person from "./Peoson";
import { useRecoilState } from "recoil";
import { selectedIndexState } from "utils/recoil/atoms";

export default function ChatPeopleList(){
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState)

  return <div className="h-screen min-w-60 flex flex-col bg-gray-50">
    <Person
    onClick={()=>setSelectedIndex(0)}
        index={0}
        isActive={selectedIndex===0}
        name={'miru'}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={'isdaoij'}
        />
        <Person
        onClick={()=>setSelectedIndex(1)}
        index={1}
        isActive={selectedIndex===1}
        name={'boba'}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={'isdaoij'}
        />
  </div>
}