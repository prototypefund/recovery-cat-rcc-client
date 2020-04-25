import { TestBed } from '@angular/core/testing';

import { StaticQuestionStore.Service.TsService } from './static-question-store.service.ts.service';

describe('StaticQuestionStore.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaticQuestionStore.Service.TsService = TestBed.get(StaticQuestionStore.Service.TsService);
    expect(service).toBeTruthy();
  });
});
