import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardBlocadminComponent } from './board-blocadmin.component';

describe('BoardBlocadminComponent', () => {
  let component: BoardBlocadminComponent;
  let fixture: ComponentFixture<BoardBlocadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardBlocadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardBlocadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
