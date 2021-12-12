import { TestBed } from '@angular/core/testing';

import { MeterdataService } from './meterdata.service';

describe('MeterdataService', () => {
  let service: MeterdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeterdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
