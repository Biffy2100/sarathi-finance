import { Component } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';
@Component({ selector: 'app-products', standalone: true, imports: [TranslatePipe], templateUrl: './products.component.html', styleUrl: './products.component.scss' })
export class ProductsComponent {}
