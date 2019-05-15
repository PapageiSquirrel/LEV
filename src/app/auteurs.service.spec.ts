import { TestBed } from '@angular/core/testing';

import { AuteursService } from './auteurs.service';

describe('AuteursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuteursService = TestBed.get(AuteursService);
    expect(service).toBeTruthy();
  });
});
