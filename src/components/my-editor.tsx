"use client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";

interface MyEditorProps {
  snippet: {
    id: number | undefined;
    name: string | undefined;
    code: string | undefined | null;
  };
  fileArray: { id: number; name: string }[];
  setFile: (id: number, name: string) => void;
}

export default function MyEditor({
  snippet,
  fileArray,
  setFile,
}: MyEditorProps) {
  // const [code, setCode] = useState(snippet.code);
  // // Becuse this Editor uses internal useState , we can say value = "" and it will just initiallize its state and later its state will change with onChange
  // const handleEditorChange = (value: string = "") => {
  //   setCode(value);
  // };

  // Calling server action inside client component with .bind method as docs recommend
  // const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);
  
  
  const renderToolBar = () => {
    return fileArray.map((file) => {
      return (
        <div
          onClick={() => setFile(file.id, file.name)}
          key={file.id}
          style={{ backgroundColor: file.id === snippet.id ? "red" : "unset" }}
        >
          {file.name}
        </div>
      );
    });
  };
  return (
    <div className="editor">
      <div className="tool-bar">{renderToolBar()}</div>
      <Editor
        height="100vh"
        theme="vs-dark"
        language="javascript"
        value={snippet.code || ""}
        options={{
          padding: { top: 16, bottom: 16 },
        }}
        // onChange={handleEditorChange}
      />

      {/* <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded cursor-pointer">
          Save
        </button>
      </form> */}
    </div>
  );
}
