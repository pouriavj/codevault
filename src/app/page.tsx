import Link from "next/link";
import { db } from "@/lib/db";
import SideBar from "@/components/side-bar";

// Making whole page dynamic by force(disable caching):
// export const dynamic = "force-dynamic";

// Making a time based caching after 3 sec refresh cache:
// export const revalidate = 3 (0 will disable cache)

const userId = 1; // Temperory no auth user_id

export default async function Home() {
  const folderData = await db.query(
    "SELECT * FROM folders WHERE user_id = $1",
    [userId],
  );
  const fileData = await db.query("SELECT * FROM files WHERE user_id = $1", [
    userId,
  ]);

  const folders = folderData.rows;
  const files = fileData.rows;
  console.log(files);
  

  return <div className="main-container">
    <SideBar folders={folders} files={files} />
    <div className="editor"></div>

  </div>;
}
