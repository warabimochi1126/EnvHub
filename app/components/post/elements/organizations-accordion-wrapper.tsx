"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { OrganizationsSelectButton } from "./organizations-select-button";
import { RepoSelectButton } from "./repo-select-button";

interface OrganizationsAccordionWrapperProps {
  orgLinkRepoNames: {
    orgName: string;
    reposData: {
      repoId: number;
      repoName: string;
    }[];
  }[];
  searchQuery: string;
}

export function OrganizationsAccordionWrapper({
  orgLinkRepoNames,
  searchQuery,
}: OrganizationsAccordionWrapperProps) {
  console.log(orgLinkRepoNames);
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
      {orgLinkRepoNames.map((orgLinkRepoName, index) => (
        <AccordionItem key={index}>
          <AccordionItemHeading
            onClick={() => toggleOrgNameHandler(orgLinkRepoName.orgName)}
          >
            <AccordionItemButton>
              <OrganizationsSelectButton
                organizationName={orgLinkRepoName.orgName}
                isAccordionClicked={orgLinkRepoName.orgName === toggleOrgName}
              />
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            {orgLinkRepoName.reposData
              .filter((repoData) =>
                repoData.repoName.toLowerCase().includes(searchQuery)
              )
              .map((repoData, index) => (
                <RepoSelectButton
                  key={index}
                  repoName={repoData.repoName}
                  repoId={repoData.repoId}
                />
              ))}
          </AccordionItemPanel>
        </AccordionItem>
      ))}
      {/* </AccordionItem> */}
    </Accordion>
  );
}
