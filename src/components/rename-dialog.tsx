"use client"

import { FC, ReactNode, useState } from "react";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "./ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type DocumentTypes = Doc<"documents">

interface RenameDialogProps {
  documentId: Id<"documents">,
  initialTitle: DocumentTypes["title"]
  children: ReactNode,
}

const RenameDialog: FC<RenameDialogProps> = (props) => {
  const { documentId, initialTitle, children } = props;
  const update = useMutation(api.documents.updateById);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [title, setTitle] = useState<DocumentTypes["title"]>(initialTitle);
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    update({ id: documentId, title: title.trim() || "Untitled" })
      .finally(() => {
        setIsUpdating(false);
        setOpen(false);
      })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={onSubmit}
        >
          <DialogHeader>
            <DialogTitle>
              Rename document
            </DialogTitle>
            <DialogDescription>
              Enter a new name for thos document
            </DialogDescription>
          </DialogHeader>
          <div
            className="my-4"
          >
            <Input
              value={title}
              name="name"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document name"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { RenameDialog }