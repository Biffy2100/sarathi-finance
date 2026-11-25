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

    expect(component.activeSlide.titleLead).toBe('Guide for Financial Freedom');
    expect(fixture.nativeElement.querySelector('.hero-art img')?.getAttribute('src'))
      .toBe('assets/hero-financial-freedom.png');
    expect(fixture.nativeElement.querySelector('h1')?.textContent?.trim())
      .toBe('Guide for Financial Freedom');

    tick(7_000);
    fixture.detectChanges();

    expect(component.activeSlide.titleLead).toBe('Goal-based');
    expect(component.isSliding).toBeTrue();
    expect(fixture.nativeElement.querySelector('.hero-art img')?.getAttribute('src'))
      .toBe('assets/hero-goal-based-planning-slide.jpg');
    expect(fixture.nativeElement.querySelector('.hero-art')?.classList.contains('is-sliding')).toBeTrue();
    expect(fixture.nativeElement.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim())
      .toBe('Goal-based Planning');
    expect(fixture.nativeElement.querySelector('.rotation-toggle')).toBeNull();

    component.nextSlide();
    expect(component.activeSlideIndex).toBe(2);
    expect(component.isSliding).toBeTrue();

    component.previousSlide();
    expect(component.activeSlideIndex).toBe(1);
    fixture.destroy();
  }));

  it('should show the requested slide order, descriptions, and images', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    const component = fixture.componentInstance;

    expect(component.slides.map(({ titleLead, titleAccent }) => [titleLead, titleAccent].filter(Boolean).join(' '))).toEqual([
      'Guide for Financial Freedom',
      'Goal-based Planning',
      'Smart Selection of Mutual Fund',
      'Wealth Protection',
    ]);
    expect(component.slides[1].description)
      .toBe('aligns goals to specific life milestones rather than chasing market returns and tracking them periodically till Goal is reached');
    expect(component.slides[2].description)
      .toBe('selects Mutual Fund Schemes matching your Financial Goals, Time Horizon and Risk Tolerance using a structured method of matching Risk Ratio and Rolling Returns');
    expect(component.slides[3].description)
      .toBe('helps to identify risks and assists in protecting your savings from sudden financial shocks');
    expect(component.slides.slice(1).every(({ descriptionBrand }) => descriptionBrand)).toBeTrue();
    expect(component.slides.map(({ image }) => image)).toEqual([
      'assets/hero-financial-freedom.png',
      'assets/hero-goal-based-planning-slide.jpg',
      'assets/hero-smart-selection-mutual-fund.jpg',
      'assets/hero-wealth-protection.png',
    ]);

    fixture.destroy();
  });

  it('renders the brand mention in descriptions as bold plain text', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    let description = fixture.nativeElement.querySelector('.hero-message p') as HTMLParagraphElement;
    expect(description.querySelector('strong')?.textContent).toBe('Sarathi');
    expect(description.querySelector('.brand-rupee')).toBeNull();
    expect(description.textContent?.trim().startsWith('Sarathi helps individuals')).toBeTrue();
    expect(fixture.nativeElement.querySelector('.hero-brand-lockup .brand-rupee')).not.toBeNull();

    component.activeSlideIndex = 1;
    fixture.detectChanges();
    description = fixture.nativeElement.querySelector('.hero-message p') as HTMLParagraphElement;
    expect(description.querySelector('strong')?.textContent).toBe('Sarathi');
    expect(description.querySelector('.brand-rupee')).toBeNull();
    expect(description.textContent?.trim().startsWith('Sarathi aligns goals')).toBeTrue();

    fixture.destroy();
  });
});
