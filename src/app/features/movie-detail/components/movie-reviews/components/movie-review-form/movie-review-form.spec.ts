import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReviewForm } from './movie-review-form';

describe('MovieReviewForm', () => {
  let component: MovieReviewForm;
  let fixture: ComponentFixture<MovieReviewForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieReviewForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieReviewForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
