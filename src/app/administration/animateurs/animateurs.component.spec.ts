import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateursComponent } from './animateurs.component';

describe('AnimateursComponent', () => {
  let component: AnimateursComponent;
  let fixture: ComponentFixture<AnimateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimateursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
