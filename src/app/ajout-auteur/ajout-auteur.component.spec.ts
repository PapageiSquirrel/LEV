import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAuteurComponent } from './ajout-auteur.component';

describe('AjoutAuteurComponent', () => {
  let component: AjoutAuteurComponent;
  let fixture: ComponentFixture<AjoutAuteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutAuteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
