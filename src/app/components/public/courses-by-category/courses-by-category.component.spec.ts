import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesByCategoryComponent } from './courses-by-category.component';

describe('CoursesByCategoryComponent', () => {
  let component: CoursesByCategoryComponent;
  let fixture: ComponentFixture<CoursesByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
