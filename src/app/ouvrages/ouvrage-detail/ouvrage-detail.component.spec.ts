import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvrageDetailComponent } from './ouvrage-detail.component';

describe('OuvrageDetailComponent', () => {
  let component: OuvrageDetailComponent;
  let fixture: ComponentFixture<OuvrageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuvrageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuvrageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
