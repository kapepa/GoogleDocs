import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react";
import { FC } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";

type DocumentTypes = Doc<"documents">

interface DocumentMenuProps {
  documentId: DocumentTypes["_id"],
  title: DocumentTypes["title"]
  onNewTabClick: (id: DocumentTypes["_id"]) => void
}

const DocumentMenu: FC<DocumentMenuProps> = (props) => {
  const { documentId, title, onNewTabClick } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
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
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RenameDialog
          documentId={documentId}
          initialTitle={title}
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <FilePenIcon
              className="size-4 mr-2"
            />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog
          documentId={documentId}
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon
              className="size-4 mr-2"
            />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem
          onClick={onNewTabClick.bind(null, documentId)}
        >
          <ExternalLinkIcon
            className="size-4 mr-2"
          />
          Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DocumentMenu }