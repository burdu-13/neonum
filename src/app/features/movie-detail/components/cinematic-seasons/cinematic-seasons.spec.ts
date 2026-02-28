import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinematicSeasons } from './cinematic-seasons';

describe('CinematicSeasons', () => {
  let component: CinematicSeasons;
  let fixture: ComponentFixture<CinematicSeasons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinematicSeasons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinematicSeasons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
