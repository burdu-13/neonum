import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnToggle } from './nn-toggle';

describe('NnToggle', () => {
  let component: NnToggle;
  let fixture: ComponentFixture<NnToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NnToggle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NnToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
