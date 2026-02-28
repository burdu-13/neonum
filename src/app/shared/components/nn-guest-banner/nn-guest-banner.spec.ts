import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnGuestBanner } from './nn-guest-banner';

describe('NnGuestBanner', () => {
  let component: NnGuestBanner;
  let fixture: ComponentFixture<NnGuestBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NnGuestBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NnGuestBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
