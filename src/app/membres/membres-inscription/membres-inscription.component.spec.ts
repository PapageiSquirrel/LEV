import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresInscriptionComponent } from './membres-inscription.component';

describe('MembresInscriptionComponent', () => {
  let component: MembresInscriptionComponent;
  let fixture: ComponentFixture<MembresInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembresInscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembresInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
