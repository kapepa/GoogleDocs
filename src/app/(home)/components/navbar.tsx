import { Rounters } from "@/enums/routers";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { SearchInput } from "./search-input";
import { UserButton } from '@clerk/clerk-react'

const Navbar: FC = () => {

  return (
    <nav
      className="flex items-center justify-between h-full w-full"
    >
      <div
        className="flex gap-3 items-center shrink-0 pr-6"
      >
        <Link
          href={Rounters.Home}
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
          />
        </Link>
        <h3
          className="text-xl"
        >
          Docs
        </h3>
      </div>
      <SearchInput />
      <UserButton />
    </nav>
  )
}

export { Navbar }