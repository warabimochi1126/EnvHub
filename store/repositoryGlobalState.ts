import { create } from "zustand";

interface State {
  repositorySearchStr: string;
  setRepoSearchStr: (input: string) => void;
}

export const useStore = create<State>()((set) => ({
  repositorySearchStr: "",
  setRepoSearchStr: (input) => set({ repositorySearchStr: input })
}));