import { TestBed } from '@angular/core/testing';

import { MovieDetail } from './movie-detail';

describe('MovieDetail', () => {
  let service: MovieDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
