import { TestBed, inject } from '@angular/core/testing';

import { RouteAuthService } from './route-auth.service';

describe('RouteAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteAuthService]
    });
  });

  it('should be created', inject([RouteAuthService], (service: RouteAuthService) => {
    expect(service).toBeTruthy();
  }));
});
