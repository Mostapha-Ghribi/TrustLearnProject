import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListetudiantComponent } from './listetudiant.component';

describe('ListetudiantComponent', () => {
  let component: ListetudiantComponent;
  let fixture: ComponentFixture<ListetudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListetudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListetudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
