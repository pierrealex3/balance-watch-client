import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTemplateGroupComponent } from './tt-group-home.component';

describe('TransactionTemplateGroupComponent', () => {
  let component: TransactionTemplateGroupComponent;
  let fixture: ComponentFixture<TransactionTemplateGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTemplateGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTemplateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
