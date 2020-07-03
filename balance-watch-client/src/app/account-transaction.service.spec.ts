import { TestBed } from '@angular/core/testing';

import { AccountTransactionService } from './account-transaction.service';

describe('AccountTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountTransactionService = TestBed.get(AccountTransactionService);
    expect(service).toBeTruthy();
  });
});
