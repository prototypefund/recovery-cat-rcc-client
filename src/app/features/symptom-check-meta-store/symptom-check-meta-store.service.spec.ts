import { TestBed } from '@angular/core/testing';

import { SymptomChecksMetaStoreService } from './symptom-checks-meta-store.service';

describe('SymptomChecksMetaStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SymptomChecksMetaStoreService = TestBed.get(SymptomChecksMetaStoreService);
    expect(service).toBeTruthy();
  });
});
