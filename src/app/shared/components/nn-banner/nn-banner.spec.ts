import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnBanner } from './nn-banner';

describe('NnBanner', () => {
  let component: NnBanner;
  let fixture: ComponentFixture<NnBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NnBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NnBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
