import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaff } from './edit-staff';

describe('EditStaff', () => {
  let component: EditStaff;
  let fixture: ComponentFixture<EditStaff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStaff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStaff);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
