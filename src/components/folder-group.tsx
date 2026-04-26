"use client";
import { useState } from "react";
import ChevronIcon from "./icons/chevron-icon";
import ClosedFolderIcon from "./icons/closed-folder-icon";
import OpenFolderIcon from "./icons/open-folder-icon";
import FileIcon from "./icons/file-icon";

interface FolderGroupProps {
  id: number;
  name: string;
  findChildren: (id: number) => {
    childFolders: {
      id: number;
      name: string;
      user_id: number | null;
      folder_id: number | null;
    }[];
    childFiles: {
      id: number;
      name: string;
      user_id: number | null;
      folder_id: number | null;
      content: string | null;
    }[];
  };
}

export default function FolderGroup({
  id,
  name,
  findChildren,
}: FolderGroupProps) {
  const [direction, setDirection] = useState("right");

  const toggleDirection = () => {
    setDirection((prevDirection) =>
      prevDirection === "right" ? "bottom" : "right",
    );
  };

  const renderChildren = (id: number) => {
    const { childFolders, childFiles } = findChildren(id);
    return (
      <div>
        {childFolders.map((folder) => {
          return (
            <div className="child-folders" key={folder.id}>
              <FolderGroup
                id={folder.id}
                name={folder.name}
                findChildren={findChildren}
              />
            </div>
          );
        })}
        {childFiles.map((file) => {
          return (
            <div className="child-files file-title" key={file.id}>
              <FileIcon /> {file.name}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="folder-title" onClick={toggleDirection}>
        <ChevronIcon direction={direction} />
        {direction === "bottom" ? <OpenFolderIcon /> : <ClosedFolderIcon />}

        {name}
      </div>
      {direction === "bottom" && renderChildren(id)}
    </div>
  );
}
