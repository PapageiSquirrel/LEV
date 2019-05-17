import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOuvrageSerieComponent } from './consult-ouvrage-serie.component';

describe('ConsultOuvrageSerieComponent', () => {
  let component: ConsultOuvrageSerieComponent;
  let fixture: ComponentFixture<ConsultOuvrageSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultOuvrageSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultOuvrageSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
