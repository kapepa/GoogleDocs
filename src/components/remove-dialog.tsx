"use client"

import { FC, ReactNode, useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "./ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface RemoveDialogProps {
  documentId: Id<"documents">,
  children: ReactNode,
}

const RemoveDialog: FC<RemoveDialogProps> = (props) => {
  const { documentId, children } = props;
  const remove = useMutation(api.documents.removeById);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent
        onClick={(e) => e.stopPropagation()}
      >
        <AlertDialogHeader>
          <AlertDialogTrigger>
            Are you sure
          </AlertDialogTrigger>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => e.stopPropagation()}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemoving}
            onClick={(e) => {
              e.stopPropagation();
              setIsRemoving(true);
              remove({ id: documentId })
                .then(() => { toast.success("Document removed") })
                .catch(() => { toast.error("Something went wrong") })
                .finally(() => setIsRemoving(false))
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { RemoveDialog }