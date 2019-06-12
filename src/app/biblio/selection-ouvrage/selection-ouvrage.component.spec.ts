import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionOuvrageComponent } from './selection-ouvrage.component';

describe('SelectionOuvrageComponent', () => {
  let component: SelectionOuvrageComponent;
  let fixture: ComponentFixture<SelectionOuvrageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionOuvrageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionOuvrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
