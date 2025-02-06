"use client"

import { useThreads, useSelf } from "@liveblocks/react/suspense";
import { FC } from "react";
import { Avatar } from "./avatar";

const AvatarsStack: FC = () => {
  // const users = useThreads();
  const currentUser = useSelf();

  return (
    <>
      <div
        className="flex items-center"
      >
        {
          currentUser && (
            <div
              className="relative ml-2"
            >
              <Avatar
                src={currentUser.info?.avatar!}
                name="You"
              />
            </div>
          )
        }
        <div>

        </div>
      </div>
      {/* <div
        className="flex"
      >
        {
          users.threads.map((user) => {

            return (
              <Avatar
                key={user.id}
                src={user.}
              />
            )
          })
        }
      </div> */}
    </>
  )
}

export { AvatarsStack }