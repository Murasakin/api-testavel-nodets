import { setYear, parseISO } from 'date-fns';

/**
 * receives "2022-08-10" and returns "2023-08-10"
 * @param date the present date
 */
export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}
