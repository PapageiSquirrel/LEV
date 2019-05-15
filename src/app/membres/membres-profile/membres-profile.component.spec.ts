import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresProfileComponent } from './membres-profile.component';

describe('MembresProfileComponent', () => {
  let component: MembresProfileComponent;
  let fixture: ComponentFixture<MembresProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembresProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembresProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
