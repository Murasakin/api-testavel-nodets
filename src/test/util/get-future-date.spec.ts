import { expect, test } from 'vitest';
import { getFutureDate } from './get-future-date';

test('add one year to date', () => {
  const year = new Date().getFullYear();
  expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(year + 1);
});
