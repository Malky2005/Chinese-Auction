import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorGiftListComponent } from './donor-gift-list.component';

describe('DonorGiftListComponent', () => {
  let component: DonorGiftListComponent;
  let fixture: ComponentFixture<DonorGiftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonorGiftListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorGiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
