# Job Search

This application uses Typescript, Tailwind, React and Vite to produce an application for viewing jobs relevant to my skill set.

I used AI to help me with certain parts of the syntax and troubleshooting, but this code is largely not AI-generated. I wanted to sharpen my skills and write the code manually so I could learn how to use these technologies the old-fashioned way and not just skate by using AI to generate the code.

## Acceptance Criteria

1. Wire up a full job flow for one company that filters out all irrelevant jobs (non-software-engineer, non-remote or not San Antonio, TX area) and evaluates whether they've been seen before.
2. For each job that has not been seen before, give me the option to mark it as not a match,and never show me the job again
3. Make sure that companies that do not have any matching jobs have a blank/empty state and do not error out
4. For each job, display the title, when it was first published (if that data is available) and last updated, and give a link to the job posting
5. For each job, give me the option to evaluate it against my resume/cover letter qualifications and soft skills using a score from 0-100. Allow me to put a numerical threshold on the match percentage (say, minimum 65%) before recommending I apply to the job
6. If a job is older than a month, flag it as "Old post"
7. Group jobs by company
8. Implement caching so subsequent page reloads do not re-call any APIs (data should live for 24 hours)
9. For later than MVP, create a spreadsheet of all of the companies by their job boards with their identifier and make constants for each one that has an API available (Greenhouse, Ashby, etc.)
10. Separate out bookmarks where there is no API to call the job board and I'll need to keep checking those manually
