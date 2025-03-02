import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './shared/services/flowbite.service';
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { FooterComponent } from "./core/layout/footer/footer.component";
import { AuthService } from './core/services/auth/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FreshCart';
  _flowbiteService = inject(FlowbiteService)
  _authService = inject(AuthService)
  constructor() { }


  ngOnInit(): void {

    this._flowbiteService.loadFlowbite((flowbite) => {

      console.log('Flowbite loaded', flowbite);
    });
    this._authService.isLogedIngUser()



  }


}









