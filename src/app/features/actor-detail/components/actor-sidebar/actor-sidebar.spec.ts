import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorSidebar } from './actor-sidebar';

describe('ActorSidebar', () => {
  let component: ActorSidebar;
  let fixture: ComponentFixture<ActorSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
