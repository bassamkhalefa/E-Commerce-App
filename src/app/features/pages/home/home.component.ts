import { Component } from '@angular/core';
import { RecentProductsComponent } from "./components/recent-products/recent-products.component";
import { PopularCategoryComponent } from "./components/popular-category/popular-category.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  imports: [RecentProductsComponent, PopularCategoryComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
