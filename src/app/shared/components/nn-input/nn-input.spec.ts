import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnInput } from './nn-input';

describe('NnInput', () => {
  let component: NnInput;
  let fixture: ComponentFixture<NnInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NnInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NnInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
