import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesFetch } from './services-fetch';

describe('ServicesFetch', () => {
  let component: ServicesFetch;
  let fixture: ComponentFixture<ServicesFetch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesFetch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesFetch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
