"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export async function editSnippet(id: number, code: string) {
  await db.query("UPDATE snippet SET code = $1 WHERE id = $2", [code, id]);

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.query("DELETE FROM snippet WHERE id = $1", [id]);
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData,
) {
  const title = formData.get("title");
  const code = formData.get("code");

  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title must be longer",
    };
  }

  if (typeof code !== "string" || code.length < 10) {
    return {
      message: "Code must be longer",
    };
  }

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
