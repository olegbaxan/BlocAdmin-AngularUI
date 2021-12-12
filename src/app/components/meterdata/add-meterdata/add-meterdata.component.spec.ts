import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeterdataComponent } from './add-meterdata.component';

describe('AddMeterdataComponent', () => {
  let component: AddMeterdataComponent;
  let fixture: ComponentFixture<AddMeterdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeterdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
