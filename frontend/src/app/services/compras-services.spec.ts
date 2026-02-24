import { TestBed } from '@angular/core/testing';

import { ComprasServices } from './compras-services';

describe('ComprasServices', () => {
  let service: ComprasServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprasServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
