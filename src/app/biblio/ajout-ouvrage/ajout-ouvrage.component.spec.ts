import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutOuvrageComponent } from './ajout-ouvrage.component';

describe('AjoutOuvrageComponent', () => {
  let component: AjoutOuvrageComponent;
  let fixture: ComponentFixture<AjoutOuvrageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutOuvrageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutOuvrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
