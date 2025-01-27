import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ListIcon, ListOrderedIcon, LucideIcon } from "lucide-react";
import { FC } from "react";

interface ListsProps {
  label: string,
  icon: LucideIcon,
  isActive: () => boolean | undefined,
  onClick: () => void,
}

const ListButton: FC = () => {
  const { editor } = useEditorStore();

  const lists: ListsProps[] = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Order List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
      >
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <ListIcon
            className="size-4"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-1 flex flex-col gap-y-1"
      >
        {
          lists.map(({ label, icon: Icon, onClick, isActive }) => (
            <button
              key={label}
              onClick={onClick}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                isActive() && "bg-neutral-200/80",
              )}
            >
              <Icon
                className="size-4"
              />
              <span
                className="text-sm"
              >
                {label}
              </span>
            </button>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ListButton }