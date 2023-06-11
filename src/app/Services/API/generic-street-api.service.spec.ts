import { TestBed } from '@angular/core/testing';

import { GenericStreetApiService } from './generic-street-api.service';

describe('GenericStreetApiService', () => {
  let service: GenericStreetApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericStreetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
