import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import SnippetEditForm from "@/components/snippet-edit-form";

interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const { id } = await props.params;
  const snippetId = parseInt(id);
  try {
    const result = await db.query("SELECT * FROM snippet WHERE id = $1", [
      snippetId,
    ]);
    const snippet = result.rows[0];
    if (!snippet) {
      return notFound();
    }
    return <div><SnippetEditForm snippet={snippet} /></div>;
  } catch (err: any) {
    console.log(err.message);
    return notFound();
  }
}
