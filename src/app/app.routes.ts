import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedUsreGuard } from './core/guards/auth/loged-usre.guard';

export const routes: Routes = [
    {
        path: "auth", component: AuthLayoutComponent, children:

            [
                { path: "", canActivate: [logedUsreGuard], loadComponent: () => import("../app/core/pages/register/register.component").then(c => c.RegisterComponent) },
                { path: "login", canActivate: [logedUsreGuard], loadComponent: () => import("../app/core/pages/login/login.component").then(c => c.LoginComponent) },
                { path: "forget-password", canActivate: [logedUsreGuard], loadComponent: () => import("../app/core/pages/forget-password/forget-password.component").then(c => c.ForgetPasswordComponent) },
            ]
    },


    { path: "", loadComponent: () => import("../app/core/pages/login/login.component").then(c => c.LoginComponent) },
    { path: "home", canActivate: [authGuard], loadComponent: () => import("../app/features/pages/home/home.component").then(c => c.HomeComponent) },
    { path: "brands", canActivate: [authGuard], loadComponent: () => import("../app/features/pages/brands/brands.component").then(c => c.BrandsComponent) },
    { path: "categories", canActivate: [authGuard], loadComponent: () => import("../app/features/pages/categories/categories.component").then(c => c.CategoriesComponent) },
    { path: "products", canActivate: [authGuard], loadComponent: () => import("../app/features/pages/products/products.component").then(c => c.ProductsComponent) },
    { path: "cart", canActivate: [authGuard], loadComponent: () => import("../app/features/pages/cart/cart.component").then(c => c.CartComponent) },
    { path: "productsdetails/:id", canActivate: [authGuard], loadComponent: () => import("../app/features/pages/products-details/products-details.component").then(c => c.ProductsDetailsComponent) },
    { path: "checkout/:cartId", canActivate: [authGuard], loadComponent: () => import("../app/features/pages/checkout/checkout.component").then(c => c.CheckoutComponent) },
    { path: "allorders", canActivate: [authGuard], loadComponent: () => import("../app/features/pages/orders/orders.component").then(c => c.OrdersComponent) },

    { path: "**", canActivate: [authGuard], loadComponent: () => import("../app/core/pages/not-found/not-found.component").then(c => c.NotFoundComponent) },




];
