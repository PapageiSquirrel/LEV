import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresConnexionComponent } from './membres-connexion.component';

describe('MembresConnexionComponent', () => {
  let component: MembresConnexionComponent;
  let fixture: ComponentFixture<MembresConnexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembresConnexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembresConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
