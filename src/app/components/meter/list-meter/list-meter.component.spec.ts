import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMeterComponent } from './list-meter.component';

describe('ListMeterComponent', () => {
  let component: ListMeterComponent;
  let fixture: ComponentFixture<ListMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
