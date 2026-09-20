import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductsComponent } from './components/products/products.component';
import { ValuePropositionComponent } from './components/value-proposition/value-proposition.component';
import { FounderComponent } from './components/founder/founder.component';
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
    ContactCtaComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
