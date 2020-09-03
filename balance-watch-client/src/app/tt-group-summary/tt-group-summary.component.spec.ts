import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtGroupSummaryComponent } from './tt-group-summary.component';

describe('TtGroupSummaryComponent', () => {
  let component: TtGroupSummaryComponent;
  let fixture: ComponentFixture<TtGroupSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtGroupSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtGroupSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
