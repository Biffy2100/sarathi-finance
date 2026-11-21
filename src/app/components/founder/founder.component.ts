import { Component } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';
@Component({ selector: 'app-founder', standalone: true, imports: [TranslatePipe], templateUrl: './founder.component.html', styleUrl: './founder.component.scss' })
export class FounderComponent {}
