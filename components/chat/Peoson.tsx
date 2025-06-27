"use client";

import TimeAgo from "javascript-time-ago";
import { getRandomImage } from "utils/random";
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export default function Person({
  index,
  userId,
  name,
  onlineAt,
  isActive=false,
  onChatScreen=false,
  onClick=null,
}) {
  return (
    <div
      className={`flex w-full min-w-60 gap-4 items-center p-4 ${onClick && 'cursor-pointer'}
        ${!onChatScreen && isActive && "bg-light-blue-50"}
      ${!onChatScreen && !isActive && "bg-gray-50" }
      ${onChatScreen && 'bg-gray-50'}`}
      onClick={onClick}
    >
      <img
        src={getRandomImage(index)}
        alt={name}
        className="w-104 h-10 rounded-full"
      />
      <div>
        <p className="text-black font-bold text-lg">{name}</p>
        <p className="text-gray-500">{onlineAt && timeAgo.format(Date.parse(onlineAt))}</p>
      </div>
    </div>
  );
}
