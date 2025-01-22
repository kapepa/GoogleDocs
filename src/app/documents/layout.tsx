import { FC, ReactNode } from "react";

interface DocumentsLayoutProps {
  children: ReactNode
}

const DocumentsLayout: FC<DocumentsLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div>
      {children}
    </div>
  )
}

export default DocumentsLayout;