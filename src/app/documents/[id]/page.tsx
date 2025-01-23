import { NextPage } from "next";
import { Editor } from "./components/editor";

interface DocumentsIdPageProps {
  params: Promise<{ id: string }>
}

const DocumentsIdPage: NextPage<DocumentsIdPageProps> = async (props) => {
  const { id } = await props.params;

  return (
    <div
      className="min-h-screen bg-[#FAFBFD]"
    >
      <Editor />
    </div>
  )
}

export default DocumentsIdPage;