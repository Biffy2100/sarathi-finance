import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';

interface HeroSlide {
  titleLead: string;
  titleAccent: string;
  description: string;
  brandPrefix?: boolean;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly rotationIntervalMs = 7_000;
  private readonly transitionDurationMs = 2000;
  private rotationTimer?: number;
  private transitionTimer?: number;

  readonly slides: HeroSlide[] = [
    {
      titleLead: 'Plan today for a more',
      titleAccent: 'secure tomorrow.',
      description: 'helps individuals improve financial literacy, make sound decisions, and build a secure financial future through expert guidance and personalised financial planning.',
      brandPrefix: true,
    },
    {
      titleLead: 'Goal-based',
      titleAccent: 'Planning',
      description: 'Sarathi aligns goals with specific life milestones, rather than chasing market returns, and tracks progress periodically until each goal is reached.',
    },
    {
      titleLead: 'Smart Selection of',
      titleAccent: 'Mutual Fund',
      description: 'Sarathi selects mutual fund schemes to match your financial goals, time horizon, and risk tolerance using a structured approach based on risk ratios and rolling returns.',
    },
    {
      titleLead: 'Wealth',
      titleAccent: 'Protection',
      description: 'Sarathi helps identify risks and protect your savings from sudden financial shocks.',
    },
  ];

  activeSlideIndex = 0;
  isSliding = false;

  get activeSlide(): HeroSlide {
    return this.slides[this.activeSlideIndex];
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.updateRotationTimer();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.stopRotationTimer();
    if (this.transitionTimer !== undefined) {
      window.clearTimeout(this.transitionTimer);
    }
  }

  previousSlide(): void {
    this.showSlide((this.activeSlideIndex - 1 + this.slides.length) % this.slides.length);
    this.updateRotationTimer();
  }

  nextSlide(): void {
    this.showSlide((this.activeSlideIndex + 1) % this.slides.length);
    this.updateRotationTimer();
  }

  private showSlide(index: number): void {
    if (this.transitionTimer !== undefined) {
      window.clearTimeout(this.transitionTimer);
      this.transitionTimer = undefined;
    }

    this.activeSlideIndex = index;
    if (!isPlatformBrowser(this.platformId)) {
      this.isSliding = false;
      return;
    }

    this.isSliding = true;
    this.transitionTimer = window.setTimeout(() => {
      this.isSliding = false;
      this.transitionTimer = undefined;
    }, this.transitionDurationMs);
  }

  private updateRotationTimer(): void {
    this.stopRotationTimer();
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.rotationTimer = window.setInterval(() => {
      this.showSlide((this.activeSlideIndex + 1) % this.slides.length);
    }, this.rotationIntervalMs);
  }

  private stopRotationTimer(): void {
    if (this.rotationTimer !== undefined) {
      window.clearInterval(this.rotationTimer);
      this.rotationTimer = undefined;
    }
  }
}
