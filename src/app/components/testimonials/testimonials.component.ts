import { Component } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  readonly testimonials = [
    {
      quote: 'Sujit explained complex investment decisions in simple language and helped us build a plan that actually matched our life goals.',
      name: 'Amit S.',
      detail: 'Business owner, Mumbai'
    },
    {
      quote: 'The guidance felt personal and practical. We finally understood where to invest, what to protect, and how to plan for the future without stress.',
      name: 'Neha & Rahul P.',
      detail: 'Young professionals, Pune'
    },
    {
      quote: 'From insurance to goal planning, every recommendation was thoughtful and well-structured. It made financial decisions feel far less overwhelming.',
      name: 'Priya M.',
      detail: 'Parent and investor, Bengaluru'
    }
  ];
}
