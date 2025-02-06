"use client"

import { FC } from "react";

interface AvatarProps {
  src: string,
  name: string,
}

const AVATAR_SIZE = 36;

const Avatar: FC<AvatarProps> = (props) => {
  const { src, name } = props;

  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className="group -ml-2 shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
    >
      <div
        className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity"
      >
        {name}
      </div>
      <img
        alt={name}
        src={src}
        className="size-full rounded-full"
      />
    </div>
  )
}

export { Avatar }