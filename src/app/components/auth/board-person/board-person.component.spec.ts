import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPersonComponent } from './board-person.component';

describe('BoardPersonComponent', () => {
  let component: BoardPersonComponent;
  let fixture: ComponentFixture<BoardPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
