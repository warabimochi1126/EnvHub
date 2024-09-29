import { create } from "zustand";

// old
interface State {
  repositorySearchStr: string;
  setRepoSearchStr: (input: string) => void;
  selectedRepositoryName: string;
  setSelectedRepositoryName: (input: string) => void;
}

// old
export const useStore = create<State>()((set) => ({
  repositorySearchStr: "",
  setRepoSearchStr: (input) => set({ repositorySearchStr: input }),
  selectedRepositoryName: "",
  setSelectedRepositoryName: (input) => set({ selectedRepositoryName: input }),
}));

interface SelectedRepoData {
  repoId: number;
  repoName: string;
}

interface SelectedRepoState {
  selectedRepoData: SelectedRepoData;
  setSelectedRepoData: (input: SelectedRepoData) => void;
}

export const useRepoDataStore = create<SelectedRepoState>()((set) => ({
  selectedRepoData: { repoId: 0, repoName: "" },
  setSelectedRepoData: (input) => set({ selectedRepoData: input }),
}));

interface SelectedCommitData {
  repoId: number;
  commitUuid: string;
}

interface SelectedCommitState {
  selectedCommitData: SelectedCommitData;
  setSelectedCommitData: (input: SelectedCommitData) => void;
}

export const useCommitDataStore = create<SelectedCommitState>()((set) => ({
  selectedCommitData: { repoId: 0, commitUuid: "" },
  setSelectedCommitData: (input) => set({ selectedCommitData: input }),
}));
