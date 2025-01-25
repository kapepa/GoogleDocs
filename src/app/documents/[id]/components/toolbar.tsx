"use client"

import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquare, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { FC } from "react";
import { ToolbarButton } from "./toolbar-button";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { FontFamilyButton } from "./font-family-button";
import { HeadingLevelButton } from "./heading-level-button";
import { TextColorButton } from "./text-color-button";
import { HighlightColorButton } from "./highlight-color-button";

interface SectionsVal {
  icon: LucideIcon,
  label: string,
  onClick: () => void,
  isActive?: boolean,
}

const Toolbar: FC = () => {
  const { editor } = useEditorStore();

  const sections: SectionsVal[][] = [
    [
      {
        icon: Undo2Icon,
        label: "Undo",
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        icon: Redo2Icon,
        label: "Redo",
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        icon: PrinterIcon,
        label: "Print",
        onClick: () => window.print()
      },
      {
        icon: SpellCheckIcon,
        label: "Spell check",
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
        }
      }
    ],
    [
      {
        icon: BoldIcon,
        label: "Bold",
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        icon: ItalicIcon,
        label: "Italic",
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        icon: UnderlineIcon,
        label: "Underline",
        isActive: editor?.isActive('underline'),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        icon: MessageSquarePlusIcon,
        label: "Comment",
        isActive: false,
        onClick: () => console.log("TODO: Comment")
      },
      {
        icon: ListTodoIcon,
        label: "List todo",
        isActive: editor?.isActive("taskList"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        icon: RemoveFormattingIcon,
        label: "Remove Formatting",
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ]
  ];

  return (
    <div
      className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto"
    >
      {
        sections[0].map((item) => (
          <ToolbarButton
            key={item.label}
            icon={item.icon}
            isActive={item.isActive}
            onClick={item.onClick}
          />
        ))
      }
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300"
      />
      <FontFamilyButton />
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300"
      />
      <HeadingLevelButton />
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300"
      />
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300"
      />
      {
        sections[1].map((item) => (
          <ToolbarButton
            key={item.label}
            icon={item.icon}
            isActive={item.isActive}
            onClick={item.onClick}
          />
        ))
      }
      <TextColorButton />
      <HighlightColorButton />
      <Separator
        orientation="vertical"
        className="h-6 bg-neutral-300"
      />
      {
        sections[2].map((item) => (
          <ToolbarButton
            key={item.label}
            icon={item.icon}
            isActive={item.isActive}
            onClick={item.onClick}
          />
        ))
      }
    </div>
  )
}

export { Toolbar }