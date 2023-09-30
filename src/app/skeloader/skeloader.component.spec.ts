import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeloaderComponent } from './skeloader.component';

describe('SkeloaderComponent', () => {
  let component: SkeloaderComponent;
  let fixture: ComponentFixture<SkeloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
