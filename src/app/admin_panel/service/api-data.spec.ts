import { TestBed } from '@angular/core/testing';

import { ApiData } from './api-data';

describe('ApiData', () => {
  let service: ApiData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
