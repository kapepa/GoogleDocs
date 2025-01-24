"use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { FC } from "react";

interface ToolbarButtonProps {
  icon: LucideIcon,
  isActive?: boolean,
  onClick?: () => void,
}

const ToolbarButton: FC<ToolbarButtonProps> = (props) => {
  const { icon: Icon, isActive, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        { isActive: "bg-neutral-200/80" }
      )}
      disabled={isActive}
    >
      <Icon
        className="size-4"
      />
    </button>
  )
}

export { ToolbarButton }