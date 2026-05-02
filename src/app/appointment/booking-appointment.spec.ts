import { TestBed } from '@angular/core/testing';

import { BookingAppointment } from './booking-appointment';

describe('BookingAppointment', () => {
  let service: BookingAppointment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingAppointment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
