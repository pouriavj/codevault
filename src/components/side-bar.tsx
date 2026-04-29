"use client";

import FolderGroup from "./folder-group";
import AddFileIcon from "./icons/add-file-icon";
import AddFolderIcon from "./icons/add-folder-icon";
import ClosedFolderIcon from "./icons/closed-folder-icon";
import Logo from "./icons/logo";
import SearchIcon from "./icons/search-icon";
import UserIcon from "./icons/user-icon";

import { startTransition, useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

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
  selectedFile: number;
  setFile: (id: number, name: string) => void;
  setFolder: (id: number) => void;
  selectedFolder: number;
  addFolderInput: () => void;
  isAddingFolder: boolean; // To know if the input UI is visible
  submitAction: (formData: FormData) => void;
  isPending: boolean;
  formState: {
    message: string | null;
  };
  cancelFolderInput: () => void;
}

// types for the form values
type FormValues = {
  name: string;
};

export default function SideBar({
  folders,
  files,
  selectedFile,
  setFile,
  setFolder,
  selectedFolder,
  addFolderInput,
  isAddingFolder,
  submitAction,
  isPending,
  formState,
  cancelFolderInput,
}: SideBarProps) {
  // In this app client side errors in the input form is handled with RHF but if some error happens inside server action (like db err)
  // server error in managed with useActionState hook , this hook doesnt have live erros like RHF and also showing and dissappearing
  // errors sent from server that are using server state is tricky and needs many useStates and useEffects , this way by using RHF
  // all client side errors managed with live update and in case of server error its managed with useActionState .
  // this setup needs a trigger method and a ref to the form becuse event.currentTarget in this handleFormSubmit wont work with react rules
  // thats why to be able to work with react rules it needs a direct ref to the form to be able to create FormData.

  // Initialize React Hook Form
  const {
    control,
    trigger, // For manually triggering RHF to bypass form onSubmit method which is used by useActionState
    formState: { errors: rhfErrors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });

  // Ref for the form element
  const formRef = useRef<HTMLFormElement>(null);

  // This local state is used in pair with useEffect to cancel the input when the form is submitted , becuse cancelFolderInput
  // is a parent function that sets the folder array back to original array, and removes the mock child folder input, and for that
  // it needed to be in the parent , thats why useEffect was necessary here
  // so that when the local state isSubmitted changes , the component also rerenders
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 5. Handle Submit Click
  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    // Prevent default form submission
    e.preventDefault();

    // Trigger RHF validation
    const isValid = await trigger();

    if (isValid && formRef.current) {
      // If valid, submit the form to the server action using the ref
      const formData = new FormData(formRef.current);
      startTransition(() => {
        submitAction(formData);
        setIsSubmitted(true);
      });
    }
  };

  // 2. Watch for submittion of the form to cancel the mock folder input
  useEffect(() => {
    if (isSubmitted) {
      cancelFolderInput();
      reset();
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  // Fetch folder group childern on nested child folder call
  const folderGroupChildren = (folderId: number | null) => {
    const childFolders = folders.filter((folder) => {
      return folder.folder_id === folderId;
    });
    const childFiles = files.filter((file) => {
      return file.folder_id === folderId;
    });
    return { childFolders, childFiles };
  };

  const renderFolders = folders.map((folder) => {
    // Ui input for adding a folder , catching special folder with user_id = -1
    if (folder.user_id === -1 && folder.folder_id == null) {
      const rootUserId =
        folders.find((f) => f.folder_id === null && f.user_id !== -1)
          ?.user_id || null;
      return (
        // Mock folder input 
        <div
          key={-1}
          className="folder-title"
          style={{ marginLeft: 28 }}
          // Stop propagation so clicks inside this div don't trigger the global handler in ClientContainer
          onClick={(e) => e.stopPropagation()}
        >
          <ClosedFolderIcon />
          {/* React Hook Form with ref and manual trigger method, onSubmit method uses useActionState hook */}
          <form ref={formRef} onSubmit={handleFormSubmit}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "نام پوشه اجباری است.",
                minLength: {
                  value: 2,
                  message: "نام باید حداقل ۲ کاراکتر باشد.",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  autoFocus
                  placeholder="نام پوشه"
                  className="border p-1 rounded"
                />
              )}
            />

            {/* Hidden inputs to send user_id and folder_id to server action*/}
            <input type="hidden" name="folder_id" value="" />
            <input type="hidden" name="user_id" value={rootUserId || ""} />

            <button
              type="submit"
              disabled={isPending}
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
            >
              {isPending ? "در حال ذخیره..." : "ذخیره"}
            </button>

            {/* Display React Hook Form Errors (Client-side) */}
            {rhfErrors.name && (
              <div className="text-red-500 text-sm mt-1">
                {rhfErrors.name.message}
              </div>
            )}
            {/* Display Server Errors (Backend) */}
            {/* {formState.serverError && (
              <div className="text-red-500 text-sm mt-1">
                {formState.serverError}
              </div>
            )} */}
          </form>
        </div>
      );
    }

    if (folder.folder_id == null) {
      return (
        <FolderGroup
          key={folder.id}
          id={folder.id}
          name={folder.name}
          findChildren={folderGroupChildren}
          selectedFile={selectedFile}
          setFile={setFile}
          setFolder={setFolder}
          selectedFolder={selectedFolder}
        />
      );
    }
  });

  const handleParentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    // Only runs when the parent itself is clicked, not any child
    if (e.target === e.currentTarget) {
      setFolder(0);
    }
  };

  const handleAddFolder = () => {
    addFolderInput();
  };

  return (
    <div className="side-bar">
      <div className="header-container">
        <div className="logo">
          <Logo />
          <UserIcon />
        </div>
        <SearchIcon />
      </div>
      <div className="create-buttons">
        <div className="button">
          <AddFileIcon />
        </div>
        {!isAddingFolder && (
          <div className="button" onClick={handleAddFolder}>
            <AddFolderIcon />
          </div>
        )}
      </div>
      <div
        style={{ height: "100%" }}
        onMouseDown={(e) => {
          handleParentClick(e);
        }}
      >
        <div className="explorer">{renderFolders}</div>
      </div>
    </div>
  );
}
