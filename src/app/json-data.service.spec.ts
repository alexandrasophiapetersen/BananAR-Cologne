import { TestBed } from '@angular/core/testing';

import { JsonDataService } from './json-data.service';

describe('JsonDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonDataService = TestBed.get(JsonDataService);
    expect(service).toBeTruthy();
  });
});
