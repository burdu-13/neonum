import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinematicEpisodes } from './cinematic-episodes';

describe('CinematicEpisodes', () => {
  let component: CinematicEpisodes;
  let fixture: ComponentFixture<CinematicEpisodes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinematicEpisodes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinematicEpisodes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
