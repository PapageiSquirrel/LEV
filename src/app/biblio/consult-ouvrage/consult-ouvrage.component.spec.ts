import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOuvrageComponent } from './consult-ouvrage.component';

describe('ConsultOuvrageComponent', () => {
  let component: ConsultOuvrageComponent;
  let fixture: ComponentFixture<ConsultOuvrageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultOuvrageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultOuvrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
