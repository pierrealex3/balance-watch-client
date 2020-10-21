import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EydoyComponent } from './eydoy.component';

describe('EydoyComponent', () => {
  let component: EydoyComponent;
  let fixture: ComponentFixture<EydoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EydoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EydoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
