import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMatchesStatsComponent } from './player-matches-stats.component';

describe('PlayerMatchesStatsComponent', () => {
  let component: PlayerMatchesStatsComponent;
  let fixture: ComponentFixture<PlayerMatchesStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerMatchesStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMatchesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
