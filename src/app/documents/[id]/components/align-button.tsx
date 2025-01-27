import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, LucideIcon } from "lucide-react";
import { FC } from "react";

interface AlignProps {
  label: string,
  value: string,
  icon: LucideIcon
}

const AlignButton: FC = () => {
  const { editor } = useEditorStore();

  const alignments: AlignProps[] = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
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
          <AlignLeftIcon
            className="size-4"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-1 flex flex-col gap-y-1"
      >
        {
          alignments.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setTextAlign(value).run()}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                editor?.isActive({ TextAlign: value }) && "bg-neutral-200/80",
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

export { AlignButton }