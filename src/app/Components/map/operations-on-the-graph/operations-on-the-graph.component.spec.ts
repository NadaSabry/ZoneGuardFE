import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsOnTheGraphComponent } from './operations-on-the-graph.component';

describe('OperationsOnTheGraphComponent', () => {
  let component: OperationsOnTheGraphComponent;
  let fixture: ComponentFixture<OperationsOnTheGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsOnTheGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationsOnTheGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
