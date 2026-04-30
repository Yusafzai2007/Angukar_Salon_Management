import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchCategory } from './fetch-category';

describe('FetchCategory', () => {
  let component: FetchCategory;
  let fixture: ComponentFixture<FetchCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FetchCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
