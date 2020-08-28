import { TestBed } from '@angular/core/testing';

import { StaticSymptomCheckStoreService } from './static-symptom-check-store.service';

describe('StaticSymptomCheckStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaticSymptomCheckStoreService = TestBed.get(StaticSymptomCheckStoreService);
    expect(service).toBeTruthy();
  });
});
