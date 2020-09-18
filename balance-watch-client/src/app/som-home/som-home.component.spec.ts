import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomHomeComponent } from './som-home.component';

describe('SomHomeComponent', () => {
  let component: SomHomeComponent;
  let fixture: ComponentFixture<SomHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
