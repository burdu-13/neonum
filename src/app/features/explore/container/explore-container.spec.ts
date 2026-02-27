import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureContainer } from './explore-container';

describe('FeatureContainer', () => {
  let component: FeatureContainer;
  let fixture: ComponentFixture<FeatureContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
