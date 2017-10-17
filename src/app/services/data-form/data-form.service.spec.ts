import { TestBed, inject } from '@angular/core/testing';

import { DataFormService } from './data-form.service';

describe('DataFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataFormService]
    });
  });

  it('should be created', inject([DataFormService], (service: DataFormService) => {
    expect(service).toBeTruthy();
  }));
});
