import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnRating } from './nn-rating';

describe('NnRating', () => {
  let component: NnRating;
  let fixture: ComponentFixture<NnRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NnRating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NnRating);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
