import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileContainer } from './user-profile-container';

describe('UserProfileContainer', () => {
  let component: UserProfileContainer;
  let fixture: ComponentFixture<UserProfileContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
