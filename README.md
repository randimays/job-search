# Job Search (WIP as of 10/14/26)

This application uses Typescript, Tailwind, React, Zustand, MaterialUI, Node and Vite to produce an application for viewing jobs relevant to my skill set and interests.

I used AI to help me with parts of the code and troubleshooting, but this code is largely written by me! I wanted to sharpen my skills and write the code myself so I could learn how to use these technologies the old-fashioned way.

## Requirements

- A spreadsheet called `jobBoards.csv` in the `data` folder with data in three columns (do **NOT** add a row for column titles):
  1. The job provider (e.g. "Greenhouse")
  2. The company identifier used in the GET call to Greenhouse to retrieve jobs for the company (e.g. `capitaltg`)
  3. The name of the company (optional, not used in the code but is helpful for reference when editing the spreadsheet)
- Node v24+

## How to run/use this project

1. Pull down the code for the project from Github
2. Run `npm install` within the `job-search` directory
3. Confirm that you have version 24 or later of Node installed
4. Create the spreadsheet as per the **Requirements** section above and replace the `data > jobBoards.csv` spreadsheet with your own
5. Review the `src/constants.ts` file and add your `ROLE_MATCHERS`, which are keywords pertaining to job titles you'd like to see in your matches
6. Next, add the components for `ROLE_EXCLUSIONS`, which are keywords pertaining to job titles you'd like to filter out of your matches
7. Run `npm run dev` to spin up the local server
8. Navigate to `http://localhost:5173` in your browser

## Acceptance Criteria (also WIP)

- Wire up a full job flow for one company that filters out all irrelevant jobs (non-software-engineer, non-remote or not San Antonio, TX area) and evaluates whether they've been seen before.
- For each job that has not been seen before, give me the option to mark it as not a match,and never show me the job again
- Make sure that companies that do not have any matching jobs have a blank/empty state and do not error out
- For each job, display the title, when it was first published (if that data is available) and last updated, and give a link to the job posting
- If the published date is not available, add the date the data was first fetched by this application and note that on the date
- For each job, give me the option to evaluate it against my resume/cover letter qualifications and soft skills using a score from 0-100. Allow me to put a numerical threshold on the match percentage (say, minimum 65%) before recommending I apply to the job
- If a job is older than a month, flag it as "Old post"
- Group jobs by company
- Implement caching so subsequent page reloads do not re-call any APIs (data should live for 24 hours, how long does browser keep them around for?)
- For later than MVP, create a spreadsheet of all of the companies by their job boards with their identifier and make constants for each one that has an API available (Greenhouse, Ashby, etc.)
- Separate out bookmarks where there is no API to call the job board and I'll need to keep checking those manually
- Use a local SQLite database to store data that is pulled that matches the requirements (is remote engineering job). The company name and ID for the posting should be unique
- If the job no longer returns from the API, it should be deleted from the database
- If I mark that I am not a match or not interested in a job, it should be deleted from the database
- The table displaying on the screen should be information from the SQLite database, not from the APIs themselves.
- Have a section for omitted job titles so the person filling in the keywords can make sure they aren't filtering out anything they want to see
- Add a loading state when the jobs are fetching so it's clear that service calls are being made. Should I add a progress bar for this?
- Implement a dark mode
- Add filters, search for homepage
- Refine the remote/virtual filter to filter out other countries
- Create a button for "I've already applied" to remove a job from the list
- Add linting rules
- Make sure that companies that are flagged as no jobs / no matching jobs actually have a successful service call
- Test for performance, see where bottlenecks are and improve caching, fetching and retries
- Fix all the "any" types
- Make links out of the omitted jobs so if anything comes up in there that I'm interested in, I can go directly to it
  -Troubleshoot the Paylocity listings, they don't all fire even after retries, or come back blank

## Notes

- ADP & ICIMS do not have a publicly-accessible API to call for jobs
