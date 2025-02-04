"use client"

// import { useQuery } from "convex/react";
import { Navbar } from "./components/navbar";
import { TemplatesGallery } from "./components/templates-gallery";
import { api } from "../../../convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { DocumentsTable } from "./components/documents-table";
import { useSearchParam } from "@/hooks/use-search-param";

export default function Home() {
  const [search] = useSearchParam("search")
  const { results, status, loadMore } = usePaginatedQuery(api.documents.get, { search }, { initialNumItems: 5 });

  return (
    <div
      className="flex min-h-screen flex-col"
    >
      <div
        className="z-10 h-16 bg-white p-4"
      >
        <Navbar />
      </div>
      <div
        className="mt-16"
      >
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
}
