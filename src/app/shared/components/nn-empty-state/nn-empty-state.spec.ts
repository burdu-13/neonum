import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnEmptyState } from './nn-empty-state';

describe('NnEmptyState', () => {
  let component: NnEmptyState;
  let fixture: ComponentFixture<NnEmptyState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NnEmptyState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NnEmptyState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
