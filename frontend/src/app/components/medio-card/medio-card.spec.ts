import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioCard } from './medio-card';

describe('MedioCard', () => {
  let component: MedioCard;
  let fixture: ComponentFixture<MedioCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedioCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedioCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
