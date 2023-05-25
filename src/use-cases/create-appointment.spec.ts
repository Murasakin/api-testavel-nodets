import { describe, expect, it } from 'vitest';
import { CreateAppointment } from './create-appointment';
import { Appointment } from '../entities/appointment';
import { getFutureDate } from '../test/util/get-future-date';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository';

describe('Create Appointment', () => {
  it('Should be able to create an appointment', () => {
    const AppointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(AppointmentsRepository);

    const startsAt = getFutureDate('2022-10-10');
    const endsAt = getFutureDate('2022-10-11');

    expect(
      createAppointment.execute({
        customer: 'Jhon Doe',
        startsAt,
        endsAt,
      }),
    ).resolves.toBeInstanceOf(Appointment);
  });

  it('Should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2022-10-10');
    const endsAt = getFutureDate('2022-10-15');

    const AppointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(AppointmentsRepository);

    await createAppointment.execute({
      customer: 'Jhon Doe',
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: 'Jhon Doe',
        startsAt: getFutureDate('2022-10-14'),
        endsAt: getFutureDate('2022-10-18'),
      }),
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: 'Jhon Doe',
        startsAt: getFutureDate('2022-10-08'),
        endsAt: getFutureDate('2022-10-12'),
      }),
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: 'Jhon Doe',
        startsAt: getFutureDate('2022-10-08'),
        endsAt: getFutureDate('2022-10-17'),
      }),
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: 'Jhon Doe',
        startsAt: getFutureDate('2022-10-11'),
        endsAt: getFutureDate('2022-10-12'),
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
