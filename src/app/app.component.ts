import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductsComponent } from './components/products/products.component';
import { ValuePropositionComponent } from './components/value-proposition/value-proposition.component';
import { FounderComponent } from './components/founder/founder.component';
import { LinkedInPostsComponent } from './components/linkedin-posts/linkedin-posts.component';
import { ContactCtaComponent } from './components/contact-cta/contact-cta.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    ProductsComponent,
    ValuePropositionComponent,
    FounderComponent,
    LinkedInPostsComponent,
    ContactCtaComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private scrollObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const rootElement = this.elementRef.nativeElement as HTMLElement;
    const revealTargets = rootElement.querySelectorAll<HTMLElement>(
      '.hero-copy, .hero-art, .stats > div, .section-top > *, .product-grid article, '
      + '.value-section > .container > .section-heading, .value-intro, .value-list > div, '
      + '.founder-grid > *, .post-grid article, .contact-layout > *',
    );
    const revealGroups = new Map<HTMLElement, number>();

    this.scrollObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    for (const target of revealTargets) {
      const group = target.parentElement;
      const index = group ? revealGroups.get(group) ?? 0 : 0;
      if (group) {
        revealGroups.set(group, index + 1);
      }

      target.classList.add('scroll-reveal');
      target.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 90}ms`);
      this.scrollObserver.observe(target);
    }
  }

  ngOnDestroy(): void {
    this.scrollObserver?.disconnect();
  }
}
