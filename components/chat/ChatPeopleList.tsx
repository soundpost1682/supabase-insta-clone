'use client'

import { useState } from "react";
import Person from "./Peoson";
import { useRecoilState } from "recoil";
import { selectedUserIdState, selectedUserIndexState } from "utils/recoil/atoms";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "actions/chatActions";

export default function ChatPeopleList({loggedInUser}){
  const [selectedUserId, setSelectedUserId] = useRecoilState(selectedUserIdState)
  const [selectedUserIndex, setSelectedUserIndex] = useRecoilState(selectedUserIndexState)
  const getAllusersQuery = useQuery({
    queryKey : ['users'],
    queryFn : async ()=> {
      const allUsers = await getAllUsers()
      console.log(allUsers)
      return allUsers.filter(user => user.id !== loggedInUser.id)
    }
  })

  return <div className="h-screen min-w-60 flex flex-col bg-gray-50">
    {getAllusersQuery.data?.map((user, index) =>(
      <Person
    onClick={()=>{
      setSelectedUserId(user.id)
      setSelectedUserIndex(index)
    }}
        index={index}
        isActive={selectedUserId=== user.id}
        name={user.email.split("@")[0]}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={user.id}
        />
    ))}
    {/* <Person
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
        /> */}
  </div>
}