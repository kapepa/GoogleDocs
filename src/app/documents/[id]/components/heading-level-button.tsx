
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { FC } from "react";
import { Level } from '@tiptap/extension-heading'

interface HeaderValues {
  label: string,
  value: number,
  fontSize: string,
}

const HeadingLevelButton: FC = () => {
  const { editor } = useEditorStore();

  const headings: HeaderValues[] = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ]

  const getCurrentHeading = () => {
    for (let level = 1; level <= headings.length; level++) {
      if (editor?.isActive("heading", { level })) return `Heading ${level}`
    }
    return headings[0].label
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
      >
        <button
          className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <span
            className="truncate"
          >
            {getCurrentHeading()}
          </span>
          <ChevronDownIcon
            className="ml-2 size-4 shrink-0"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-1 flex flex-col gap-y-1"
      >
        {
          headings.map(({ label, value, fontSize }) => (
            <button
              key={value}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                (value === 0 && !editor?.isActive("heading") || editor?.isActive("heading", { level: value })) && "bg-neutral-200/80"
              )}
              style={{ fontSize: fontSize }}
              onClick={() => {
                if (value === 0) {
                  editor?.chain().focus().setParagraph().run()
                } else {
                  editor?.chain().focus().toggleHeading({ level: value as Level }).run()
                }
              }}
            >
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

export { HeadingLevelButton }