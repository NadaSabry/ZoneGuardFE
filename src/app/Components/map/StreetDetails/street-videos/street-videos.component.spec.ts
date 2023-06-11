import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetVideosComponent } from './street-videos.component';

describe('StreetVideosComponent', () => {
  let component: StreetVideosComponent;
  let fixture: ComponentFixture<StreetVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreetVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreetVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
