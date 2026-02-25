import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnButton } from './nn-button';

describe('NnButton', () => {
  let component: NnButton;
  let fixture: ComponentFixture<NnButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NnButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NnButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
