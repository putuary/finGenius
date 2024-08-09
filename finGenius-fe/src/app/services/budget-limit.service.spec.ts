import { TestBed } from '@angular/core/testing';

import { BudgetLimitService } from './budget-limit.service';

describe('BudgetLimitService', () => {
  let service: BudgetLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
