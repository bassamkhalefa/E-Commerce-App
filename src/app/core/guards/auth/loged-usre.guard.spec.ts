import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logedUsreGuard } from './loged-usre.guard';

describe('logedUsreGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logedUsreGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
