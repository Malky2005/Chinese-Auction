import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftTicketsComponent } from './gift-tickets.component';

describe('GiftTicketsComponent', () => {
  let component: GiftTicketsComponent;
  let fixture: ComponentFixture<GiftTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GiftTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
