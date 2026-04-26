import { useState } from "react";
// Global custom hook to select files , its defined inside SideBar (parent) and passed to nested child FormGroups
export default function useFileSelect() {
  const [selectedFile, setSelectedFile] = useState(0);
  function setFile(id: number) {
    setSelectedFile(id);
  }

  return { selectedFile, setFile };
}
