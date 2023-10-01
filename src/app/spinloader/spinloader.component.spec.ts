import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinloaderComponent } from './spinloader.component';

describe('SpinloaderComponent', () => {
  let component: SpinloaderComponent;
  let fixture: ComponentFixture<SpinloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
