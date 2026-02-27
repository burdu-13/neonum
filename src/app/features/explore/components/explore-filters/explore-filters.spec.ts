import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreFilters } from './explore-filters';

describe('ExploreFilters', () => {
  let component: ExploreFilters;
  let fixture: ComponentFixture<ExploreFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
