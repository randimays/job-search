import { create } from 'zustand';

export interface JobsState {
  omittedTitles: string[],
  addOmittedTitles: (titles: string[]) => void
}

export const useJobs = create<JobsState>()(set => ({
  omittedTitles: [],
  addOmittedTitles: (titles: string[]) => 
    set(state => ({ omittedTitles: [...state.omittedTitles, ...titles]}))
}));