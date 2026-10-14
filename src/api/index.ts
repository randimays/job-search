import { GreenhouseMock } from '../mock/greenhouse';

const BOARD_CONFIGS = [
  {
    name: 'Greenhouse',
    url: (board_token: string): string => `https://boards-api.greenhouse.io/v1/boards/${board_token}/jobs`
  }
];

// export const fetchJobs = async (boardName: string, companyIdentifier: string): any => {
export const fetchJobs = (boardName: string, companyIdentifier: string): any => {
  // const configs = BOARD_CONFIGS.filter(board => board.name === boardName)?.[0];

  // if (!configs || !configs.url) {
  //   throw new Error('fetchJobs: invalid or unsupported boardName');
  // }

  // try {
  //   const response = fetch(configs.url(companyIdentifier));
  //   const json = (await response).json();

  //   console.log('response: ', json);
  // } catch (error) {
  //   throw new Error(`Error from service call: ${error}`);
  // }

  return GreenhouseMock;
}