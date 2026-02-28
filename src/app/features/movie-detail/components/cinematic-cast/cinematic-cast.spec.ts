import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinematicCast } from './cinematic-cast';

describe('CinematicCast', () => {
  let component: CinematicCast;
  let fixture: ComponentFixture<CinematicCast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinematicCast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinematicCast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
