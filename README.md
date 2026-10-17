# Job Search (WIP as of 10/14/26)

This application uses Typescript, Tailwind, React and Vite to produce an application for viewing jobs relevant to my skill set.

I used AI to help me with parts of the code and troubleshooting, but this code is largely written by me! I wanted to sharpen my skills and write the code myself so I could learn how to use these technologies the old-fashioned way.

## Acceptance Criteria (also WIP)

- Wire up a full job flow for one company that filters out all irrelevant jobs (non-software-engineer, non-remote or not San Antonio, TX area) and evaluates whether they've been seen before.
- For each job that has not been seen before, give me the option to mark it as not a match,and never show me the job again
- Make sure that companies that do not have any matching jobs have a blank/empty state and do not error out
- For each job, display the title, when it was first published (if that data is available) and last updated, and give a link to the job posting
- If the published date is not available, add the date the data was first fetched by this application and note that on the date
- For each job, give me the option to evaluate it against my resume/cover letter qualifications and soft skills using a score from 0-100. Allow me to put a numerical threshold on the match percentage (say, minimum 65%) before recommending I apply to the job
- If a job is older than a month, flag it as "Old post"
- Group jobs by company
- Implement caching so subsequent page reloads do not re-call any APIs (data should live for 24 hours)
- For later than MVP, create a spreadsheet of all of the companies by their job boards with their identifier and make constants for each one that has an API available (Greenhouse, Ashby, etc.)
- Separate out bookmarks where there is no API to call the job board and I'll need to keep checking those manually
- Use a local SQLite database to store data that is pulled that matches the requirements (is remote engineering job). The company name and ID for the posting should be unique
- If the job no longer returns from the API, it should be deleted from the database
- If I mark that I am not a match or not interested in a job, it should be deleted from the database
- The table displaying on the screen should be information from the SQLite database, not from the APIs themselves.
- Have a section for omitted job titles so the person filling in the keywords can make sure they aren't filtering out anything they want to see
