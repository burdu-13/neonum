import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieActions } from './movie-actions';

describe('MovieActions', () => {
  let component: MovieActions;
  let fixture: ComponentFixture<MovieActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
