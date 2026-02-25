import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieShelf } from './movie-shelf';

describe('MovieShelf', () => {
  let component: MovieShelf;
  let fixture: ComponentFixture<MovieShelf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieShelf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieShelf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
