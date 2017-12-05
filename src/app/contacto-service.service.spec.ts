import { TestBed, inject } from '@angular/core/testing';

import { ContactoServiceService } from './contacto-service.service';

describe('ContactoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactoServiceService]
    });
  });

  it('should be created', inject([ContactoServiceService], (service: ContactoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
