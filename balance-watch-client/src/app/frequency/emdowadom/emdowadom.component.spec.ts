import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmdowadomComponent } from './emdowadom.component';

describe('EmdowadomComponent', () => {
  let component: EmdowadomComponent;
  let fixture: ComponentFixture<EmdowadomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmdowadomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmdowadomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
