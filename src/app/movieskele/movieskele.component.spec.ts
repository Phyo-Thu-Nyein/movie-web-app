import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieskeleComponent } from './movieskele.component';

describe('MovieskeleComponent', () => {
  let component: MovieskeleComponent;
  let fixture: ComponentFixture<MovieskeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieskeleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieskeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
