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

const orgsData = [
  { orgName: "team-kaihatu1", repoName: ["team-repo-a-1"] },
  { orgName: "team-kaihatu2", repoName: ["team-repo-a-2", "team-repo-b-2"] },
  {
    orgName: "team-kaihatu3",
    repoName: ["team-repo-a-3", "team-repo-b-3", "team-repo-c-3"],
  },
];

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
