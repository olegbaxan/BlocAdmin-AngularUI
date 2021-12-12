import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFlatComponent } from './list-flat.component';

describe('ListFlatComponent', () => {
  let component: ListFlatComponent;
  let fixture: ComponentFixture<ListFlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
