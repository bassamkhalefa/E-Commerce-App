import { Component, inject, Input, OnInit } from '@angular/core';
import { Category } from '../../../core/interfaces/category';
import { CatergoryService } from '../../services/catergory/catergory.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  categories!: Category[]

  _catergoryService = inject(CatergoryService)

  ngOnInit(): void {
    this.getcatergoy()

  }

  getcatergoy() {
    this._catergoryService.getcatergoy().subscribe({
      next: (res) => {
        console.log(res.data)
        this.categories = res.data
      }
    })
  }



}
