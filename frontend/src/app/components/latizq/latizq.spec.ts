import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Latizq } from './latizq';

describe('Latizq', () => {
  let component: Latizq;
  let fixture: ComponentFixture<Latizq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Latizq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Latizq);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
