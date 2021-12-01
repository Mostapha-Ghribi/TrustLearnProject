import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecategoryComponent } from './updatecategory.component';

describe('UpdatecategoryComponent', () => {
  let component: UpdatecategoryComponent;
  let fixture: ComponentFixture<UpdatecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
