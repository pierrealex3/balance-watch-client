import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTransactionDetailsComponent } from './account-transaction-details.component';

describe('AccountTransactionDetailsComponent', () => {
  let component: AccountTransactionDetailsComponent;
  let fixture: ComponentFixture<AccountTransactionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTransactionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
