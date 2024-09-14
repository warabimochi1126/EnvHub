"use client";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { TbZoom } from "react-icons/tb";

// TODO:コンポーネント分割・カスタムフックスの作成
export default function Page() {
  const [isPersonalClicked, setIsPersonalClicked] = useState<boolean>(true);
  const clickPersonal = () => setIsPersonalClicked(true);
  const clickOrganizations = () => setIsPersonalClicked(false);

  return (
    <div className="flex">
      <div className="w-1/4 bg-white h-screen">
        <RepositoryTypeSelctor
          isPersonalClicked={isPersonalClicked}
          clickPersonal={clickPersonal}
          clickOrganizations={clickOrganizations}
        />
        <RepoNameSearchBar />
      </div>
      <div className="w-3/4 bg-[#F3F4F6]">
        <span>aaa</span>
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
