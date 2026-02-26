import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReviews } from './movie-reviews';

describe('MovieReviews', () => {
  let component: MovieReviews;
  let fixture: ComponentFixture<MovieReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
