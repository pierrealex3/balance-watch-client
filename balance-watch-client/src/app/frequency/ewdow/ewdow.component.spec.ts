import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EwdowComponent } from './ewdow.component';

describe('EwdowComponent', () => {
  let component: EwdowComponent;
  let fixture: ComponentFixture<EwdowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EwdowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EwdowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
