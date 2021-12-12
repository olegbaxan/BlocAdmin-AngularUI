import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkaddMeterdataComponent } from './bulkadd-meterdata.component';

describe('BulkaddMeterdataComponent', () => {
  let component: BulkaddMeterdataComponent;
  let fixture: ComponentFixture<BulkaddMeterdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkaddMeterdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkaddMeterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
