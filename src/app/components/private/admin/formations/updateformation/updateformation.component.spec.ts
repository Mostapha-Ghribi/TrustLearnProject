import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateformationComponent } from './updateformation.component';

describe('UpdateformationComponent', () => {
  let component: UpdateformationComponent;
  let fixture: ComponentFixture<UpdateformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
