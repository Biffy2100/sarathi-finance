import { Component } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';
@Component({ selector: 'app-contact-cta', standalone: true, imports: [TranslatePipe], templateUrl: './contact-cta.component.html', styleUrl: './contact-cta.component.scss' })
export class ContactCtaComponent {}
