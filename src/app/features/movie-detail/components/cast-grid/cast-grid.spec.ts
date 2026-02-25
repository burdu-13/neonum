import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastGrid } from './cast-grid';

describe('CastGrid', () => {
  let component: CastGrid;
  let fixture: ComponentFixture<CastGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CastGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
