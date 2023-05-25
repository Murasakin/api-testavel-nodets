import { expect, test } from 'vitest';
import { Appointment } from './appointment';
import { getFutureDate } from '../test/util/get-future-date';

test('create an appointment', () => {
  const startsAt = getFutureDate('2022-10-08');
  const endsAt = getFutureDate('2022-10-09');

  const appointment = new Appointment({
    customer: 'Jhon Doe',
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual('Jhon Doe');
});

test('could not create an appointment whose end date is before start date', () => {
  const startsAt = getFutureDate('2022-08-10');
  const endsAt = getFutureDate('2022-08-09');

  expect(() => {
    return new Appointment({
      customer: 'Jhon Doe',
      startsAt,
      endsAt,
    });
  }).toThrow();
});

test('could not create an appointment whose start date is before the current date', () => {
  const startsAt = new Date();
  const endsAt = new Date();
  startsAt.setDate(startsAt.getDate() - 1);
  endsAt.setDate(endsAt.getDate() + 3);

  expect(() => {
    return new Appointment({
      customer: 'Jhon Doe',
      startsAt,
      endsAt,
    });
  }).toThrow();
});
