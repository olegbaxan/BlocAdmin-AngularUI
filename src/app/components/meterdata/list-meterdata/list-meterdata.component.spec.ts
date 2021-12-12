import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMeterdataComponent } from './list-meterdata.component';

describe('ListMeterdataComponent', () => {
  let component: ListMeterdataComponent;
  let fixture: ComponentFixture<ListMeterdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMeterdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMeterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
