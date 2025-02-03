import { LoaderIcon } from "lucide-react";
import { FC } from "react";

interface FullScreanLoaderProps {
  label?: string,
}

const FullScreanLoader: FC<FullScreanLoaderProps> = (props) => {
  const { label } = props;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-2"
    >
      <LoaderIcon
        className="size-6 text-muted-foreground animate-spin"
      />
      {
        !!label
        && <p
          className="text-sm text-muted-foreground"
        >{label}</p>
      }
    </div>
  )
}

export { FullScreanLoader }