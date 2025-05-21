import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyGiftsComponent } from './buy-gifts.component';

describe('BuyGiftsComponent', () => {
  let component: BuyGiftsComponent;
  let fixture: ComponentFixture<BuyGiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyGiftsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
