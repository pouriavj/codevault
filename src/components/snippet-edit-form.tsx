"use client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";

interface SnippetEditFormProps {
  snippet: {
    id: number;
    title: string;
    code: string;
  };
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  // Becuse this Editor uses internal useState , we can say value = "" and it will just initiallize its state and later its state will change with onChange
  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  // Calling server action inside client component with .bind method as docs recommend
  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded cursor-pointer">
          Save
        </button>
      </form>
    </div>
  );
}
