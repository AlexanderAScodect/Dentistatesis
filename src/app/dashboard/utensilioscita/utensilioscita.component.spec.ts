import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtensilioscitaComponent } from './utensilioscita.component';

describe('UtensilioscitaComponent', () => {
  let component: UtensilioscitaComponent;
  let fixture: ComponentFixture<UtensilioscitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtensilioscitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtensilioscitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
