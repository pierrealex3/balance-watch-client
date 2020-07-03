import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSummaryGridComponent } from './account-summary-grid.component';

describe('AccountSummaryGridComponent', () => {
  let component: AccountSummaryGridComponent;
  let fixture: ComponentFixture<AccountSummaryGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSummaryGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
