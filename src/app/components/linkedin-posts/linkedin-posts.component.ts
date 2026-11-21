import { Component } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';

@Component({
  selector: 'app-linkedin-posts',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './linkedin-posts.component.html',
  styleUrl: './linkedin-posts.component.scss'
})
export class LinkedInPostsComponent {
  readonly posts: { title: string; url: string; image?: string }[] = [
    { title: 'Celebrating the Har Ghar MFD initiative by AssetPlus', url: 'https://lnkd.in/p/dbv2VuVg', image: 'assets/linkedin-har-ghar.jpg' },
    { title: 'Thinking of Retiring Early and Achieving FIRE (Financial Independence, Retire Early)?', url: 'https://lnkd.in/p/dND-vmpC', image: 'assets/linkedin-fire-retirement.jpg' },
    { title: 'Why SIF (Specialised Investment Fund)?', url: 'https://lnkd.in/p/dvAm2ayV' },
    { title: 'Is D.I.Y. investing on online platforms worth it?', url: 'https://lnkd.in/p/dbv2VuVg' },
    { title: 'Partner Prestige 2026', url: 'https://lnkd.in/p/dAseFDY6', image: 'assets/linkedin-partner-prestige-2026.jpg' },
    { title: 'Are you top of your finances?', url: 'https://lnkd.in/p/dR2-6TnP' },
    { title: 'Key Benefits of Global Mutual Funds', url: 'https://lnkd.in/p/dicYXuXS', image: 'assets/linkedin-global-mutual-funds.jpg' },
    { title: 'Partner Prestige 2025', url: 'https://lnkd.in/p/ds9AfKKy', image: 'assets/linkedin-partner-prestige-2025.jpg' },
    { title: 'Term Insurance. What NOT to do?', url: 'https://lnkd.in/p/dazpZDfh' },
    { title: 'Five SIP Facts that you may be aware of', url: 'https://lnkd.in/p/dK7pgHBf', image: 'assets/linkedin-sip-facts.jpg' },
    { title: 'Dilemma solved: Personal health insurance vs. corporate health plan?', url: 'https://lnkd.in/p/d5m_7esB' },
  ];
}
