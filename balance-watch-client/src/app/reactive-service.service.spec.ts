import { TestBed } from '@angular/core/testing';

import { ReactiveServiceService } from './reactive-service.service';

describe('ReactiveServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReactiveServiceService = TestBed.get(ReactiveServiceService);
    expect(service).toBeTruthy();
  });
});
