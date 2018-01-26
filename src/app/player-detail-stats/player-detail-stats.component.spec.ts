import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailStatsComponent } from './player-detail-stats.component';

describe('PlayerDetailStatsComponent', () => {
  let component: PlayerDetailStatsComponent;
  let fixture: ComponentFixture<PlayerDetailStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDetailStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDetailStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
