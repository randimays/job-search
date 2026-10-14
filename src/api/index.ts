import { GreenhouseMock } from '../mock/greenhouse';
import { greenhouseJobsHandler } from '../utils';

const BOARD_CONFIGS = [
  {
    handler: greenhouseJobsHandler,
    name: 'Greenhouse',
    url: (board_token: string): string => `https://boards-api.greenhouse.io/v1/boards/${board_token}/jobs`
  }
];

// export const fetchJobs = async (boardName: string, companyIdentifier: string): any => {
export const fetchJobs = (boardName: string, companyIdentifier: string): any => {
  const config = BOARD_CONFIGS.filter(board => board.name === boardName)?.[0];

  if (!config || !config.url) {
    throw new Error('fetchJobs: invalid or unsupported boardName');
  }

  console.log('config: ', config);

  // try {
  //   const response = fetch(config.url(companyIdentifier));
  //   const json = (await response).json();

  //   console.log('response: ', json);
  // } catch (error) {
  //   throw new Error(`Error from service call: ${error}`);
  // }

  let response = GreenhouseMock;

  const formattedJobs = config.handler(response);

  return formattedJobs;
}