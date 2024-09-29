"use client";

import { CommitListHeader } from "../elements/commit-list/commit-list-header";
import { CommitListDataFetcher } from "../elements/commit-list/commit-list-data-fetcher";

export function CommitList() {
  return (
    <>
      <div className="mx-auto w-11/12 h-80 rounded-lg border border-black overflow-y-scroll scrollbar">
        <CommitListHeader />
        <CommitListDataFetcher />
      </div>
    </>
  );
}
