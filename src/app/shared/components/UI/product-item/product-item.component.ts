import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  @Input() product!: Product
  @Output() fireAddToCarT: EventEmitter<string> = new EventEmitter()

  handelAddToCatr(id: string) {
    this.fireAddToCarT.emit(id)

  }

  // product = input.required<Product>()

}
