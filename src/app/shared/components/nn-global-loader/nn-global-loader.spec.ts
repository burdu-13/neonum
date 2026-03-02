import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnGlobalLoader } from './nn-global-loader';

describe('NnGlobalLoader', () => {
  let component: NnGlobalLoader;
  let fixture: ComponentFixture<NnGlobalLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NnGlobalLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NnGlobalLoader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
