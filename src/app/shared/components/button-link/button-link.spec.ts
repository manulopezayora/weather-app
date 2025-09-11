import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLink } from './button-link';

describe('ButtonLink', () => {
  let component: ButtonLink;
  let fixture: ComponentFixture<ButtonLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
