import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFeedback } from './movie-feedback';

describe('MovieFeedback', () => {
  let component: MovieFeedback;
  let fixture: ComponentFixture<MovieFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieFeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieFeedback);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
