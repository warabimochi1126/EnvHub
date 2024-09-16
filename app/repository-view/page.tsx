"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FcFolder } from "react-icons/fc";
import { IoLogoGithub, IoMdClose } from "react-icons/io";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

import { FaFileUpload } from "react-icons/fa";
import { LiaCheckCircle } from "react-icons/lia";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import { useDropzone } from "react-dropzone";

import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

import { FaRegFile } from "react-icons/fa6";

import { AiOutlineClose } from "react-icons/ai";

import Modal from "react-modal";
import { useModal } from "../hooks/toppage/useModal";
import { usePersonalOrOrganization } from "../hooks/post/usePersonalOrOrganization";
import { RepoNameSearchBar } from "../components/post/elements/repo-name-search-bar";
import { PersonalOrganizationSelctor } from "../components/post/elements/personal-organization-selector";
import { RepositorySelctorArea } from "../components/post/layout/repository-selector-area";
import { DropEnvArea } from "../components/post/layout/drop-env-area";
import { UploadPreviewFileContent } from "../components/post/elements/upload-preview-file-content";

const modalStyle = {
  overlay: {
    top: 0,
    left: 0,
    backgroundColor: "rgba(33,33,33,0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "1.5rem",
    width: "500px",
  },
};

const repoNamesData = ["EnvHub", "GitHub-actions-learn", "e-ten"];
const orgsData = [
  { orgName: "team-kaihatu1", repoName: ["team-repo-a-1"] },
  { orgName: "team-kaihatu2", repoName: ["team-repo-a-2", "team-repo-b-2"] },
  {
    orgName: "team-kaihatu3",
    repoName: ["team-repo-a-3", "team-repo-b-3", "team-repo-c-3"],
  },
];

// TODO:コンポーネント分割・カスタムフックスの作成
export default function Page() {
  const [dropFiles, setDropFiles] = useState<File[]>([]);
  const onDrop = (dropFiles: File[]) => {
    console.log(dropFiles);
    setDropFiles(dropFiles);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div className="flex">
      <div className="w-1/4 bg-white h-screen border-r border-black">
        <RepositorySelctorArea />
      </div>
      <div className="w-3/4 bg-white">
        <DropEnvArea />
      </div>
    </div>
  );
}
