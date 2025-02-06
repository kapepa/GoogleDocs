"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"

type User = {
  id: string,
  name: string,
  avatar: string,
}

export async function getUsers(): Promise<User[] | undefined> {
  try {
    const { sessionClaims } = await auth();
    const clerk = await clerkClient();

    const response = await clerk.users.getUserList({
      organizationId: [sessionClaims?.org_id as string],
    })

    const users = response.data.map((user) => ({
      id: user.id,
      name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
      avatar: user.imageUrl,
    }))

    return users;
  } catch (err) {

  }
}