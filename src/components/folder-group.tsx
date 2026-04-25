"use client";
import { useState } from "react";
import ChevronIcon from "./icons/chevron-icon";
import ClosedFolderIcon from "./icons/closed-folder-icon";

interface FolderGroupProps {
  id: number;
  name: string;
}

export default function FolderGroup({ id, name }: FolderGroupProps) {
  const [direction, setDirection] = useState("right");

  const toggleDirection = () => {
    setDirection((prevDirection) =>
      prevDirection === "right" ? "bottom" : "right",
    );
  };

  return (
    <div className="folder-title" onClick={toggleDirection}>
      <ChevronIcon direction={direction} />
      <ClosedFolderIcon />
      {name}
    </div>
  );
}
