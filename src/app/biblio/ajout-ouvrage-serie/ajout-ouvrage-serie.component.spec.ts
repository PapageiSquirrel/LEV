import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutOuvrageSerieComponent } from './ajout-ouvrage-serie.component';

describe('AjoutOuvrageSerieComponent', () => {
  let component: AjoutOuvrageSerieComponent;
  let fixture: ComponentFixture<AjoutOuvrageSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutOuvrageSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutOuvrageSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
