import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { BrandService } from '../../../core/services/brand/brand.service';
import { brand } from '../../../core/interfaces/brand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  brands!: brand[]


  _brandService = inject(BrandService)

  ngOnInit(): void {
    this.getcatergoy()

  }

  getcatergoy() {
    this._brandService.getBrand().subscribe({
      next: (res) => {
        console.log(res.data)
        this.brands = res.data

      }
    })
  }



}
