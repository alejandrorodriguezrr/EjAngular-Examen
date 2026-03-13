import { TestBed } from '@angular/core/testing';

import { ProveedorServices } from './proveedor-services';

describe('ProveedorServices', () => {
  let service: ProveedorServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
