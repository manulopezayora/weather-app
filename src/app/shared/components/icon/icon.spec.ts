import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Icon } from './icon';

describe('Icon', () => {
  let component: Icon;
  let fixture: ComponentFixture<Icon>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Icon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Icon);
    fixture.componentRef.setInput('iconName', 'cloud');
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
  });

  it('should create the Icon component', () => {
    expect(component).toBeTruthy();
  });

  it('should add correct class when icon name received', () => {
    const iconComponent = compiled.querySelector('.pi-cloud');
    expect(iconComponent).toBeDefined();
  });
});
