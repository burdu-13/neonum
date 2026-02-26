import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorDetailContainer } from './actor-detail-container/actor-detail-container';

describe('ActorDetailContainer', () => {
  let component: ActorDetailContainer;
  let fixture: ComponentFixture<ActorDetailContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorDetailContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorDetailContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
