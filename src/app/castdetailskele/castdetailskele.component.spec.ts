import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastdetailskeleComponent } from './castdetailskele.component';

describe('CastdetailskeleComponent', () => {
  let component: CastdetailskeleComponent;
  let fixture: ComponentFixture<CastdetailskeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastdetailskeleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastdetailskeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
