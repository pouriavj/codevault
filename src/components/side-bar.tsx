import FolderGroup from "./folder-group";
import Logo from "./icons/logo";
import SearchIcon from "./icons/search-icon";
import UserIcon from "./icons/user-icon";

interface SideBarProps {
  folders: {
    id: number;
    name: string;
    user_id: number | null;
    folder_id: number | null;
  }[];
  files: {
    id: number;
    name: string;
    user_id: number | null;
    folder_id: number | null;
    content: string | null;
  }[];
}

export default function SideBar({ folders, files }: SideBarProps) {
  const renderFolders = folders.map((folder) => {
    if (folder.folder_id == null) {
      return <FolderGroup key={folder.id} id={folder.id} name={folder.name} />;
    }
  });

  return (
    <div className="side-bar">
      <div className="header-container">
        <div className="logo">
          <Logo />
          <UserIcon />
        </div>
        <SearchIcon />
      </div>
      <div className="explorer">{renderFolders}</div>
    </div>
  );
}
