import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorHero } from './actor-hero';

describe('ActorHero', () => {
  let component: ActorHero;
  let fixture: ComponentFixture<ActorHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
