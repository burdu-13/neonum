import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultGrid } from './search-result-grid';

describe('SearchResultGrid', () => {
  let component: SearchResultGrid;
  let fixture: ComponentFixture<SearchResultGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
