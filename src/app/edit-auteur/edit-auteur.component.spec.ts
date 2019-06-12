import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuteurComponent } from './edit-auteur.component';

describe('EditAuteurComponent', () => {
  let component: EditAuteurComponent;
  let fixture: ComponentFixture<EditAuteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAuteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
