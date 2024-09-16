"use client";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { TbZoom } from "react-icons/tb";
import { FcFolder } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

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
  const [isPersonalClicked, setIsPersonalClicked] = useState<boolean>(true);
  const clickPersonal = () => setIsPersonalClicked(true);
  const clickOrganizations = () => setIsPersonalClicked(false);

  const [dropFiles, setDropFiles] = useState<File[]>([]);
  // TODO:アップロード予定のファイルの名前を入れるstateを準備する
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
        <RepositoryTypeSelctor
          isPersonalClicked={isPersonalClicked}
          clickPersonal={clickPersonal}
          clickOrganizations={clickOrganizations}
        />
        <RepoNameSearchBar />
        {repoNamesData.map((repoName, index) => (
          <RepoSelectButton key={index} repoName={repoName} />
        ))}
        <OrganizationsAccordionWrapper />
      </div>
      <div className="w-3/4 bg-white">
        <div
          className="border-2 border-dashed hover:border-gray-400 hover:bg-gray-200 transition-colors duration-500 rounded-xl mx-auto w-11/12 h-80 flex justify-center items-center mt-20"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            {dropFiles.length === 0 ? (
              <>
                <FaFileUpload size={40} />
                <span className="mt-4">
                  ここにenvファイルをドラッグ & ドロップしてください
                </span>
                <span className="text-gray-400 text-sm">または</span>
                <button
                  className="bg-black text-white rounded-lg py-2 px-4 mt-2"
                  onClick={open}
                >
                  envファイルを選択
                </button>
              </>
            ) : (
              <>
                <LiaCheckCircle size={40} color="skyblue" />
                {dropFiles.length >= 2 ? (
                  <span>
                    {dropFiles[0].name} ...他{dropFiles.length - 1}件
                  </span>
                ) : (
                  <span>{dropFiles[0].name}</span>
                )}
                <EnvFileSelectButton open={open} />
              </>
            )}
          </div>
        </div>
        <div className="w-11/12 mx-auto mt-10 border-2 rounded-lg p-4">
          <p className="font-bold mb-2">アップロード中のファイル:</p>
          {dropFiles.length === 0 ? (
            <p>アップロード中のファイルはありません。</p>
          ) : (
            <>
              <ProgressBar />
              {dropFiles.map((dropFile, index) => (
                <div key={index} className="border flex p-3 justify-between">
                  <div className="flex items-center">
                    <FaRegFile size={20} className="mr-3" />
                    <span className="text-sm">{dropFile.name}</span>
                  </div>
                  <AiOutlineClose
                    size={20}
                    className="hover:bg-gray-300 rounded-full transition-colors duration-500"
                    onClick={() =>
                      setDropFiles((prev) => prev.splice(index, 1))
                    }
                  />
                </div>
              ))}
              <button className="bg-gray-800 text-white rounded-md w-full py-3 text-sm hover:bg-gray-700 transition-colors duration-300">
                アップロードを確定する
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface RepositoryTypeSelctorProps {
  isPersonalClicked: boolean;
  clickPersonal: () => void;
  clickOrganizations: () => void;
}

export function RepositoryTypeSelctor({
  isPersonalClicked,
  clickPersonal,
  clickOrganizations,
}: RepositoryTypeSelctorProps) {
  return (
    <div className="w-11/12 bg-gray-100 mx-auto p-1 rounded-sm flex">
      <PersonalRepositoryTypeButton
        isPersonalClicked={isPersonalClicked}
        clickPersonal={clickPersonal}
        DrawingIcon={FaUser}
        repositoryTypeText="個人"
      />
      <OrganizationsRepositoryTypeButton
        isPersonalClicked={isPersonalClicked}
        clickOrganizations={clickOrganizations}
        DrawingIcon={FaUsers}
        repositoryTypeText="組織"
      />
    </div>
  );
}

// TODO:共通化する
interface RepositoryTypeButtonProps {
  isPersonalClicked: boolean;
  clickPersonal: () => void;
  clickOrganizations: () => void;
  DrawingIcon: IconType;
  repositoryTypeText: string;
}

type PersonalRepositoryTypeButtonProps = Omit<
  RepositoryTypeButtonProps,
  "clickOrganizations"
>;

export function PersonalRepositoryTypeButton({
  isPersonalClicked,
  clickPersonal,
  DrawingIcon,
  repositoryTypeText,
}: PersonalRepositoryTypeButtonProps) {
  return (
    <div
      className={`w-1/2 py-2 flex items-center justify-center rounded ${
        isPersonalClicked && "bg-white"
      }`}
      onClick={clickPersonal}
    >
      <DrawingIcon className="mr-2" />
      <span className="text-sm text-gray-500">{repositoryTypeText}</span>
    </div>
  );
}

type OrganizationsRepositoryTypeButtonProps = Omit<
  RepositoryTypeButtonProps,
  "clickPersonal"
>;

export function OrganizationsRepositoryTypeButton({
  isPersonalClicked,
  clickOrganizations,
  DrawingIcon,
  repositoryTypeText,
}: OrganizationsRepositoryTypeButtonProps) {
  return (
    <div
      className={`w-1/2 py-2 flex items-center justify-center rounded  ${
        !isPersonalClicked && "bg-white"
      }`}
      onClick={clickOrganizations}
    >
      <DrawingIcon className="mr-2" />
      <span className="text-sm text-gray-500">{repositoryTypeText}</span>
    </div>
  );
}

export function RepoNameSearchBar() {
  return (
    <div className="relative w-11/12 mx-auto">
      <TbZoom className="absolute left-3 top-[11px]" size={20} />
      <input
        className="w-full flex items-center border py-2 px-10 rounded"
        placeholder="リポジトリ名で検索"
      />
    </div>
  );
}

interface RepoSelectButtonProps {
  repoName: string;
}

export function RepoSelectButton({ repoName }: RepoSelectButtonProps) {
  return (
    <div className="w-11/12 mx-auto border rounded p-2 flex items-center text-sm">
      <FcFolder className="mr-2" size={20} />
      <span>{repoName}</span>
    </div>
  );
}

interface OrganizationsSelectButtonProps {
  organizationName: string;
  isAccordionClicked: boolean;
}

export function OrganizationsSelectButton({
  organizationName,
  isAccordionClicked,
}: OrganizationsSelectButtonProps) {
  return (
    <div className="w-11/12 mx-auto border rounded flex items-center p-2 justify-between">
      <IoLogoGithub className="mr-2" size={20} />
      <span>{organizationName}</span>
      {isAccordionClicked ? (
        <MdKeyboardDoubleArrowDown size={25} />
      ) : (
        <MdKeyboardDoubleArrowRight size={25} />
      )}
    </div>
  );
}

export function OrganizationsAccordionWrapper() {
  const [toggleOrgName, setToggleOrgName] = useState<string>("");

  const toggleOrgNameHandler = (currentClickOrgName: string) => {
    if (toggleOrgName === currentClickOrgName) {
      setToggleOrgName("");
      return;
    }

    setToggleOrgName(currentClickOrgName);
  };

  return (
    <Accordion allowZeroExpanded>
      {orgsData.map((orgData, index) => (
        <AccordionItem key={index}>
          <AccordionItemHeading
            onClick={() => toggleOrgNameHandler(orgData.orgName)}
          >
            <AccordionItemButton>
              <OrganizationsSelectButton
                organizationName={orgData.orgName}
                isAccordionClicked={orgData.orgName === toggleOrgName}
              />
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            {orgData.repoName.map((repoName, index) => (
              <RepoSelectButton key={index} repoName={repoName} />
            ))}
          </AccordionItemPanel>
        </AccordionItem>
      ))}
      {/* </AccordionItem> */}
    </Accordion>
  );
}

export function EnvFileSelectButton({ open }: { open: () => void }) {
  return (
    <button
      className="bg-black text-white rounded-lg py-2 px-4 mt-2"
      onClick={open}
    >
      envファイルを選択
    </button>
  );
}

export function ProgressBar() {
  const [uploadFileLength, setUploadFileLength] = useState<number>(5);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progressPercent >= 100) {
        clearInterval(timer);
        return;
      }

      // TODO:アップロードされたファイル数に比例してprogressPercentの値を増やす
      setProgressPercent((prev) => prev + 20);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [progressPercent, uploadFileLength]);

  return <Progress percent={progressPercent} />;
}
