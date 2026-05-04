import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchStaff } from './fetch-staff';

describe('FetchStaff', () => {
  let component: FetchStaff;
  let fixture: ComponentFixture<FetchStaff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchStaff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchStaff);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
