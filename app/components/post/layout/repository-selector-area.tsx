"use client";

import { usePersonalOrOrganization } from "@/app/hooks/post/usePersonalOrOrganization";
import { PersonalOrganizationSelctor } from "../elements/personal-organization-selector";
import { RepoNameSearchBar } from "../elements/repo-name-search-bar";
import { RepoSelectButton } from "../elements/repo-select-button";
import { OrganizationsAccordionWrapper } from "../elements/organizations-accordion-wrapper";

interface RepositorySelctorAreaProps {
  repoNames: string[];
  orgLinkRepoNames: {
    orgName: string;
    repoNames: string[];
  }[];
}
// prettier-ignore
export function RepositorySelctorArea({ repoNames, orgLinkRepoNames }: RepositorySelctorAreaProps) {
  //prettier-ignore
  const { isPersonalClicked, clickPersonal, clickOrganization } = usePersonalOrOrganization();

  return (
    <>
      <PersonalOrganizationSelctor
        isPersonalClicked={isPersonalClicked}
        clickPersonal={clickPersonal}
        clickOrganizations={clickOrganization}
      />
      <RepoNameSearchBar />
      {isPersonalClicked ? (
        repoNames.map((repoName, index) => (
          <RepoSelectButton key={index} repoName={repoName} />
        ))
      ) : (
        <OrganizationsAccordionWrapper orgLinkRepoNames={orgLinkRepoNames} />
      )}
    </>
  );
}
