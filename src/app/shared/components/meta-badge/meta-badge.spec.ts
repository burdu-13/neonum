import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaBadge } from './meta-badge';

describe('MetaBadge', () => {
  let component: MetaBadge;
  let fixture: ComponentFixture<MetaBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetaBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
