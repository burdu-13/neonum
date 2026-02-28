import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnDropdown } from './nn-dropdown';

describe('NnDropdown', () => {
  let component: NnDropdown;
  let fixture: ComponentFixture<NnDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NnDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NnDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
