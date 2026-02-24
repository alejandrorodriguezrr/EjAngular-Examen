import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Medio } from './medio';

describe('Medio', () => {
  let component: Medio;
  let fixture: ComponentFixture<Medio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Medio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Medio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
