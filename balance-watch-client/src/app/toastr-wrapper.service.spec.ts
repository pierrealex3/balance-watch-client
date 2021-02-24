import { TestBed } from '@angular/core/testing';

import { ToastrWrapperService } from './toastr-wrapper.service';

describe('ToastrWrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastrWrapperService = TestBed.get(ToastrWrapperService);
    expect(service).toBeTruthy();
  });
});
