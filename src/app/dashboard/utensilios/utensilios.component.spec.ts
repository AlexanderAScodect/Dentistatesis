import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtensiliosComponent } from './utensilios.component';

describe('UtensiliosComponent', () => {
  let component: UtensiliosComponent;
  let fixture: ComponentFixture<UtensiliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtensiliosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtensiliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
