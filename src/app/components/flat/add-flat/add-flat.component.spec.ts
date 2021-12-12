import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlatComponent } from './add-flat.component';

describe('AddFlatComponent', () => {
  let component: AddFlatComponent;
  let fixture: ComponentFixture<AddFlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
