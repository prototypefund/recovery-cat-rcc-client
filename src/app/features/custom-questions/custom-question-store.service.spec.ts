import { TestBed } from '@angular/core/testing';

import { CustomQuestionStoreService } from './custom-question-store.service';

describe('CustomQuestionStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomQuestionStoreService = TestBed.get(CustomQuestionStoreService);
    expect(service).toBeTruthy();
  });
});
