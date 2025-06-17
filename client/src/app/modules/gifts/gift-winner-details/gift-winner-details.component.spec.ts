import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftWinnerDetailsComponent } from './gift-winner-details.component';

describe('GiftWinnerDetailsComponent', () => {
  let component: GiftWinnerDetailsComponent;
  let fixture: ComponentFixture<GiftWinnerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GiftWinnerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftWinnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
