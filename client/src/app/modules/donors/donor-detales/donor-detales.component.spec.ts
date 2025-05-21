import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorDetalesComponent } from './donor-detales.component';

describe('DonorDetalesComponent', () => {
  let component: DonorDetalesComponent;
  let fixture: ComponentFixture<DonorDetalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonorDetalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorDetalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
