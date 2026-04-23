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
