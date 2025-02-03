import { FC } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { TableCell, TableRow } from "@/components/ui/table";
import { SiGoogledocs } from "react-icons/si"
import { Building2Icon, CircleUserIcon, Ghost, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface DocumentsRowProps {
  document: Doc<"documents">
}

const DocumentsRow: FC<DocumentsRowProps> = (props) => {
  const { document } = props;

  return (
    <TableRow
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
        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-full"
        >
          <MoreVertical
            className="size-4"
          />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export { DocumentsRow }