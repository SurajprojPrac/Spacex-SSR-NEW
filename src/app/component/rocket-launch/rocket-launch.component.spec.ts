import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RocketLaunchComponent } from './rocket-launch.component';

describe('RocketLaunchComponent', () => {
  let component: RocketLaunchComponent;
  let fixture: ComponentFixture<RocketLaunchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RocketLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RocketLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
