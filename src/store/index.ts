import { create } from 'zustand';

export interface JobsState {
  omittedTitles: Set<string>,
  addOmittedTitles: (titles: string[]) => void
}

export const useJobs = create<JobsState>()(set => ({
  omittedTitles: new Set(),
  addOmittedTitles: (titles: string[]) => 
    set(state => ({ omittedTitles: new Set([...state.omittedTitles, ...titles])}))
}));