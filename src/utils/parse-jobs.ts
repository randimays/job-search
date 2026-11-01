import { z } from 'zod';

/**
 * Function to validate jobs against the Zod schemas in job-api-format.ts
 * @param schema Any Zod schema such as AshbySchema
 * @param raw Plain API data from an ATS (e.g. Ashby)
 * @param ats The name of the ATS
 * @returns An array of the schema-validated jobs (objects) from the ATS
 */
export const parseJobs = <S extends z.ZodType>(schema: S, raw: unknown, ats: string): z.output<S>[] => {
  if (!Array.isArray(raw)) {
    throw new Error(`${ats}: expected an array`);
  }

  const items: z.output<S>[] = [];

  for (const item of raw) {
    const result = schema.safeParse(item);

    if (result.success) {
      items.push(result.data);
    }
  }

  if (raw.length > 0 && items.length === 0) {
    throw new Error(`${ats}: all ${raw.length} items failed validation`);
  }

  return items;
};