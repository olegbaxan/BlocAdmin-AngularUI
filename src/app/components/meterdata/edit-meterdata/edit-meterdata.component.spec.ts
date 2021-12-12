import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeterdataComponent } from './edit-meterdata.component';

describe('EditMeterdataComponent', () => {
  let component: EditMeterdataComponent;
  let fixture: ComponentFixture<EditMeterdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMeterdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMeterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
