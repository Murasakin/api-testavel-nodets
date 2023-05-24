import { expect, test } from 'vitest';
import { Appointment } from './appointment';

test('create an appointment', () => {
  const startsAt = new Date();
  const endsAt = new Date();

  endsAt.setDate(endsAt.getDate() + 1);

  const appointment = new Appointment({
    customer: 'Jhon Doe',
    startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual('Jhon Doe');
});

test('could not create an appointment whose end date is before start date', () => {
  const startsAt = new Date();
  const endsAt = new Date();

  endsAt.setDate(endsAt.getDate() - 1);

  expect(() => {
    return new Appointment({
      customer: 'Jhon Doe',
      startsAt,
      endsAt,
    });
  }).toThrow();
});
