import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  // Artificial delay to replicate loading ...
  await new Promise((r) => {
    setTimeout(r, 1000);
  });
  // ....
  const { id } = await props.params;
  try {
    const result = await db.query("SELECT * FROM snippet WHERE id = $1", [
      parseInt(id),
    ]);
    const snippet = result.rows[0];
    if (!snippet) {
      return notFound();
    }
    console.log(snippet);
    return (
      <div>
        <div className="flex m-4 justify-between items-center">
          <h1 className="text-xl font-bold">{snippet.title}</h1>
          <div className="flex gap-4">
            <button className="p-2 border rounded">Edit</button>
            <button className="p-2 border rounded">Delete</button>
          </div>
        </div>
        <pre className="p-3 border rounded bg-gray-200 border-gray-200">
          <code>{snippet.code}</code>
        </pre>
      </div>
    );
  } catch (err: any) {
    console.log(err.message);
    return notFound();
  }
}
