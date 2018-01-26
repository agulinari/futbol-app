import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailStatsComponent } from './match-detail-stats.component';

describe('MatchDetailStatsComponent', () => {
  let component: MatchDetailStatsComponent;
  let fixture: ComponentFixture<MatchDetailStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDetailStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
