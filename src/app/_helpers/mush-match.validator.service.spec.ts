import { TestBed } from '@angular/core/testing';

import { MushMatch.ValidatorService } from './mush-match.validator.service';

describe('MushMatch.ValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MushMatch.ValidatorService = TestBed.get(MushMatch.ValidatorService);
    expect(service).toBeTruthy();
  });
});
