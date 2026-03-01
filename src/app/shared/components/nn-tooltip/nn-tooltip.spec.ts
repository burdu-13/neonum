import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnTooltip } from './nn-tooltip';

describe('NnTooltip', () => {
  let component: NnTooltip;
  let fixture: ComponentFixture<NnTooltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NnTooltip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NnTooltip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
