import { TestBed } from '@angular/core/testing';

import { ActorApiService } from './actor-api-service';

describe('ActorApiService', () => {
  let service: ActorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
