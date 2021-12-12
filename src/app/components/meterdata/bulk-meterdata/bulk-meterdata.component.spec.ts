import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMeterdataComponent } from './bulk-meterdata.component';

describe('BulkMeterdataComponent', () => {
  let component: BulkMeterdataComponent;
  let fixture: ComponentFixture<BulkMeterdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkMeterdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMeterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
