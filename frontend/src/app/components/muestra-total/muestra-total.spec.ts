import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestraTotal } from './muestra-total';

describe('MuestraTotal', () => {
  let component: MuestraTotal;
  let fixture: ComponentFixture<MuestraTotal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuestraTotal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuestraTotal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
