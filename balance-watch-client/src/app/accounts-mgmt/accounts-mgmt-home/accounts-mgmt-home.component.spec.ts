import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsMgmtHomeComponent } from './accounts-mgmt-home.component';

describe('AccountsMgmtHomeComponent', () => {
  let component: AccountsMgmtHomeComponent;
  let fixture: ComponentFixture<AccountsMgmtHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsMgmtHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsMgmtHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
