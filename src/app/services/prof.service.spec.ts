import { TestBed } from '@angular/core/testing';

import { ProfService } from './prof.service';

describe('ProfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfService = TestBed.get(ProfService);
    expect(service).toBeTruthy();
  });
});
