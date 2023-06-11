import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUploadVideoComponent } from './form-upload-video.component';

describe('FormUploadVideoComponent', () => {
  let component: FormUploadVideoComponent;
  let fixture: ComponentFixture<FormUploadVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUploadVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUploadVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
