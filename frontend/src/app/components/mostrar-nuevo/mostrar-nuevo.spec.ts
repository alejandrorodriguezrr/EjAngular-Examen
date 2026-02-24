import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarNuevo } from './mostrar-nuevo';

describe('MostrarNuevo', () => {
  let component: MostrarNuevo;
  let fixture: ComponentFixture<MostrarNuevo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarNuevo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarNuevo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
