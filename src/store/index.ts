import { create } from 'zustand';

export interface JobsState {
  addOmittedTitles: (titles: string[]) => void,
  omittedTitles: Set<string>,
  fetchingJobs: boolean,
  setFetchingJobs: (fetching: boolean) => void,
}

export const useJobs = create<JobsState>()(set => ({
  omittedTitles: new Set(),
  addOmittedTitles: (titles: string[]) => 
    set(state => ({ omittedTitles: new Set([...state.omittedTitles, ...titles])})),
  fetchingJobs: false,
  setFetchingJobs: (fetching: boolean) => 
    set(() => ({ fetchingJobs: fetching }))
  }));