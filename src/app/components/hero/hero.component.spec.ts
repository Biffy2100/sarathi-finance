import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();
  });

  it('should rotate to the next message after 7 seconds', fakeAsync(() => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    expect(component.activeSlide.titleLead).toBe('Plan today for a more');

    tick(7_000);
    fixture.detectChanges();

    expect(component.activeSlide.titleLead).toBe('Goal-based');
    expect(component.isSliding).toBeTrue();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Planning');
    expect(fixture.nativeElement.querySelector('.rotation-toggle')).toBeNull();

    component.nextSlide();
    expect(component.activeSlideIndex).toBe(2);
    expect(component.isSliding).toBeTrue();

    component.previousSlide();
    expect(component.activeSlideIndex).toBe(1);
    fixture.destroy();
  }));
});
