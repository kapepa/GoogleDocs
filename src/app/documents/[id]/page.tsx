import { NextPage } from "next";

interface DocumentsIdPageProps {
  params: Promise<{ id: string }>
}

const DocumentsIdPage: NextPage<DocumentsIdPageProps> = async (props) => {
  const { id } = await props.params;

  return (
    <div>
      DocumentsIdPage {id}
    </div>
  )
}

export default DocumentsIdPage;