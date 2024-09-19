"use client";

import { usePersonalOrOrganization } from "@/app/hooks/post/usePersonalOrOrganization";
import { PersonalOrganizationSelctor } from "../elements/personal-organization-selector";
import { RepoNameSearchBar } from "../elements/repo-name-search-bar";
import { RepoSelectButton } from "../elements/repo-select-button";
import { OrganizationsAccordionWrapper } from "../elements/organizations-accordion-wrapper";
import { useState } from "react";

interface RepositorySelctorAreaProps {
  myRepoNames: { repoId: number; repoName: string }[];
  orgLinkRepoNames: {
    orgName: string;
    reposData: {
      repoId: number;
      repoName: string;
    }[];
  }[];
}
// prettier-ignore
export function RepositorySelctorArea({ myRepoNames, orgLinkRepoNames }: RepositorySelctorAreaProps) {
  //prettier-ignore
  const { isPersonalClicked, clickPersonal, clickOrganization } = usePersonalOrOrganization();
  const [ searchQuery, setSearchQuery ] = useState<string>("");
  
  return (
    <>
      <PersonalOrganizationSelctor
        isPersonalClicked={isPersonalClicked}
        clickPersonal={clickPersonal}
        clickOrganizations={clickOrganization}
      />
      <RepoNameSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isPersonalClicked ? (
        myRepoNames
        .filter(myRepoName => myRepoName.repoName.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((myRepoName, index) => (
          <RepoSelectButton key={index} repoName={myRepoName.repoName} repoId={myRepoName.repoId} />
        ))
      ) : (
        <OrganizationsAccordionWrapper orgLinkRepoNames={orgLinkRepoNames} searchQuery={searchQuery} />
      )}
    </>
  );
}
