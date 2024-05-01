import { create } from "zustand";

interface State {
  repositorySearchStr: string;
  setRepoSearchStr: (input: string) => void;
  selectedRepositoryName: string;
  setSelectedRepositoryName: (input: string) => void;
}

export const useStore = create<State>()((set) => ({
  repositorySearchStr: "",
  setRepoSearchStr: (input) => set({ repositorySearchStr: input }),
  selectedRepositoryName: "",
  setSelectedRepositoryName: (input) => set({ selectedRepositoryName: input })
}));