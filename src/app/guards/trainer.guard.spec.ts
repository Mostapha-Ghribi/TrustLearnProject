import { TestBed } from '@angular/core/testing';

import { TrainerGuard } from './trainer.guard';

describe('TrainerGuard', () => {
  let guard: TrainerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TrainerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
