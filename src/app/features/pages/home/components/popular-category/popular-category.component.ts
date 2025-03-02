import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../shared/services/categories/categories.service';
import { Category } from '../../../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-popular-category',
  imports: [CarouselModule],
  templateUrl: './popular-category.component.html',
  styleUrl: './popular-category.component.scss'
})

export class PopularCategoryComponent implements OnInit {
  categories!: Category[]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }



  _categoriesService = inject(CategoriesService)

  ngOnInit(): void {
    this.getcategories()
  }

  getcategories() {
    this._categoriesService.getAllcategories().subscribe({

      next: (res) => {
        console.log(res.data)
        this.categories = res.data
      },
      error(err) {
        console.log(err)
      },
      complete() {

      },
    })
  }



}
