import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLibro } from './add-libro';

describe('AddLibro', () => {
  let component: AddLibro;
  let fixture: ComponentFixture<AddLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLibro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLibro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
