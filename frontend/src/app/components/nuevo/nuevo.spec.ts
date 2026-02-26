import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nuevo } from './nuevo';

describe('Nuevo', () => {
  let component: Nuevo;
  let fixture: ComponentFixture<Nuevo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nuevo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nuevo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
