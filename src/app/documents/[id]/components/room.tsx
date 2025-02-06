"use client";

import { ReactNode, useEffect, useId, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullScreanLoader } from "@/components/full-screan-loader";
import { getUsers } from "../actions/actions";
import { toast } from "sonner";

type User = {
  id: string,
  name: string,
  avatar: string,
}

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        if (!!list && list.length > 0) setUsers(list);
      } catch (err) {
        toast.error("Failed to fetch users")
      }
    },
    []
  )

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={`/api/liveblocks-auth`}
      resolveUsers={({ userIds }) => userIds.map((userId) => users.find((user) => user.id === userId))}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) => {
            user.name.toLowerCase().includes(text.toLowerCase());
          })
        }
        return filteredUsers.map((user) => user.id)
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.id as string}>
        <ClientSideSuspense fallback={<FullScreanLoader label="Room loading..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}