"use client"

import { useQuery } from "convex/react";
import { Navbar } from "./components/navbar";
import { TemplatesGallery } from "./components/templates-gallery";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments)

  if (documents === undefined) return (<p>Loading...</p>)

  console.log(documents)

  return (
    <div
      className="flex min-h-screen flex-col"
    >
      <div
      // className="fixed top-0 left-0 z-10 h-16 bg-white p-4"
      >
        <Navbar />
      </div>
      <div
        className="mt-16"
      >
        <TemplatesGallery />
      </div>
    </div>
  );
}
