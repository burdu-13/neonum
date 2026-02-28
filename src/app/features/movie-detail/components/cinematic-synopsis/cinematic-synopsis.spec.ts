import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinematicSynopsis } from './cinematic-synopsis';

describe('CinematicSynopsis', () => {
  let component: CinematicSynopsis;
  let fixture: ComponentFixture<CinematicSynopsis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinematicSynopsis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinematicSynopsis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
