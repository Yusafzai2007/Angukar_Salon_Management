import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchAppointment } from './fetch-appointment';

describe('FetchAppointment', () => {
  let component: FetchAppointment;
  let fixture: ComponentFixture<FetchAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchAppointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
