import { FC } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { DocumentsRow } from "./documents-row";

interface DocumentsTableProps {
  documents: Doc<"documents">[],
  loadMore: (num: number) => void;
  status: PaginationStatus;
}

const DocumentsTable: FC<DocumentsTableProps> = (props) => {
  const { documents, loadMore, status } = props;

  return (
    <div
      className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5"
    >
      {
        documents === undefined
          ? (
            <div
              className="flex justify-center items-center h-24"
            >
              <LoaderIcon
                className="animate-spin text-muted-foreground size-5"
              />
            </div>
          )
          : (
            <Table>
              <TableHeader>
                <TableRow
                  className="hover:bg-transparent border-none"
                >
                  <TableHeader>
                    Hame
                  </TableHeader>
                  <TableHeader>
                    &nbsp;
                  </TableHeader>
                  <TableHeader
                    className="hidden md:table-cell"
                  >
                    Shared
                  </TableHeader>
                  <TableHeader
                    className="hidden md:table-cell"
                  >
                    Create at
                  </TableHeader>
                </TableRow>
              </TableHeader>
              {
                documents.length === 0
                  ? (
                    <TableBody>
                      <TableRow
                        className="hover:bg-transparent"
                      >
                        <TableCell
                          colSpan={4}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No doucment found
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )
                  : (
                    <TableBody>
                      {
                        documents.map((document) => (
                          <DocumentsRow
                            key={document._id}
                            document={document}
                          />
                        ))
                      }
                    </TableBody>
                  )
              }
            </Table>
          )
      }
    </div>
  )
}

export { DocumentsTable }