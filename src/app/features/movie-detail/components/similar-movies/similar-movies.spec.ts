import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarMovies } from './similar-movies';

describe('SimilarMovies', () => {
  let component: SimilarMovies;
  let fixture: ComponentFixture<SimilarMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarMovies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
