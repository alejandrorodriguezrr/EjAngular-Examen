import { TestBed } from '@angular/core/testing';

import { LibrosServices } from './libros-services';

describe('LibrosServices', () => {
  let service: LibrosServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrosServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
