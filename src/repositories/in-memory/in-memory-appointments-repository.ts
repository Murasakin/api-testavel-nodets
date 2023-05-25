import { areIntervalsOverlapping } from 'date-fns';
import { Appointment } from '../../entities/appointment';
import { AppointmentsRepository } from '../appointments-repository';

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date,
  ): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find(item => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: item.startsAt, end: item.endsAt },
        { inclusive: true },
      );
    });

    if (!overlappingAppointment) {
      return null;
    }

    return overlappingAppointment;
  }
}
