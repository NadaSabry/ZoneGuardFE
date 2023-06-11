import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetSecurityDetailsComponent } from './street-security-details.component';

describe('StreetSecurityDetailsComponent', () => {
  let component: StreetSecurityDetailsComponent;
  let fixture: ComponentFixture<StreetSecurityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreetSecurityDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreetSecurityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
