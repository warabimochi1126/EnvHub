import { useState } from "react";

export function usePersonalOrOrganization() {
  const [isPersonalClicked, setIsPersonalClicked] = useState<boolean>(true);
  const clickPersonal = () => setIsPersonalClicked(true);
  const clickOrganization = () => setIsPersonalClicked(false);

  return { isPersonalClicked, clickPersonal, clickOrganization };
}
