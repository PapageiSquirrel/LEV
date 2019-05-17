import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionOuvrageSerieComponent } from './selection-ouvrage-serie.component';

describe('SelectionOuvrageSerieComponent', () => {
  let component: SelectionOuvrageSerieComponent;
  let fixture: ComponentFixture<SelectionOuvrageSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionOuvrageSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionOuvrageSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
