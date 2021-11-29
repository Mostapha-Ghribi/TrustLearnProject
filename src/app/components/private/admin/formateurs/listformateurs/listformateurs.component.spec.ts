import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListformateursComponent } from './listformateurs.component';

describe('ListformateursComponent', () => {
  let component: ListformateursComponent;
  let fixture: ComponentFixture<ListformateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListformateursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListformateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
