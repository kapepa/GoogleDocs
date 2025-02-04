import { FC } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { TableCell, TableRow } from "@/components/ui/table";
import { SiGoogledocs } from "react-icons/si"
import { Building2Icon, CircleUserIcon, Ghost, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DocumentMenu } from "./document-menu";
import { Rounters } from "@/enums/routers";
import { useRouter } from "next/navigation";

type DocumentType = Doc<"documents">

interface DocumentsRowProps {
  document: DocumentType
}

const DocumentsRow: FC<DocumentsRowProps> = (props) => {
  const { document } = props;
  const router = useRouter();

  const onNewTabClick = (id: DocumentType["_id"]) => {
    window.open(`${Rounters.Documents}/${id}`, "_blank");
  }

  const onRowClick = (id: DocumentType["_id"]) => {
    router.push(`${Rounters.Documents}/${id}`);
  }

  return (
    <TableRow
      onClick={onRowClick.bind(null, document._id)}
      className="cursor-pointer"
    >
      <TableCell
        className="w-[50px]"
      >
        <SiGoogledocs
          className="size-6 fill-blue-500"
        />
      </TableCell>
      <TableCell
        className="font-medium md:w-[45%]"
      >
        {document.title}
      </TableCell>
      <TableCell
        className="text-muted-foreground hidden md:flex items-center gap-2"
      >
        {
          document.organizationId
            ? <Building2Icon />
            : <CircleUserIcon />
        }
        {
          document.organizationId
            ? "Organization"
            : "Personal"
        }
      </TableCell>
      <TableCell
        className="text-muted-foreground hidden md:table-cell"
      >
        {
          format(new Date(document._creationTime), "MMM dd, yyyy")
        }
      </TableCell>
      <TableCell
        className="flex ml-auto rounded-full"
      >
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTabClick={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  )
}

export { DocumentsRow }