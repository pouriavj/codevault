import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    try {
      const snippet = await db.query(
        "INSERT INTO snippet (title, code) VALUES ($1, $2) RETURNING *",
        [title, code],
      );
      console.log(snippet.rows[0]);
    } catch (error: any) {
      console.log(error.message);
    }
    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create A Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        <button
          className=" rounded p-2 bg-blue-200 cursor-pointer"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
}
