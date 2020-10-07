import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTransactionTemplateComponent } from './account-transaction-template.component';

describe('AccountTransactionTemplateComponent', () => {
  let component: AccountTransactionTemplateComponent;
  let fixture: ComponentFixture<AccountTransactionTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTransactionTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTransactionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
