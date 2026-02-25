import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailerContainer } from './movie-detailer-container';

describe('MovieDetailerContainer', () => {
  let component: MovieDetailerContainer;
  let fixture: ComponentFixture<MovieDetailerContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailerContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailerContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
