import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';

interface HeroSlide {
  titleLead: string;
  titleAccent?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  descriptionBrand?: boolean;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslatePipe],
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
      titleLead: 'Guide for Financial Freedom',
      description: 'helps individuals improve financial literacy, make sound decisions, and build a secure financial future through expert guidance and personalised financial planning.',
      image: 'assets/hero-financial-freedom.png',
      imageAlt: 'Financial freedom represented by a broken chain and birds at sunrise',
      descriptionBrand: true,
    },
    {
      titleLead: 'Goal-based',
      titleAccent: 'Planning',
      description: 'aligns goals to specific life milestones rather than chasing market returns and tracking them periodically till Goal is reached',
      image: 'assets/hero-goal-based-planning-slide.jpg',
      imageAlt: 'Coins stacked beneath a target, representing goal-based planning',
      descriptionBrand: true,
    },
    {
      titleLead: 'Smart Selection of',
      titleAccent: 'Mutual Fund',
      description: 'selects Mutual Fund Schemes matching your Financial Goals, Time Horizon and Risk Tolerance using a structured method of matching Risk Ratio and Rolling Returns',
      image: 'assets/hero-smart-selection-mutual-fund.jpg',
      imageAlt: 'Financial adviser pointing to savings as a client plans investments',
      descriptionBrand: true,
    },
    {
      titleLead: 'Wealth',
      titleAccent: 'Protection',
      description: 'helps to identify risks and assists in protecting your savings from sudden financial shocks',
      image: 'assets/hero-wealth-protection.png',
      imageAlt: 'Hands holding a rupee-marked money bag, representing wealth protection',
      descriptionBrand: true,
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
