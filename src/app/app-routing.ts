import { Routes } from "@angular/router";
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './views/dashboard/dashboard.component';

export const rootRouterConfig: Routes = [
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full"
  },
  {
    path: "signin",
    loadChildren: () =>
      import("./views/signin/signin.module").then(m => m.SigninModule),
    data: { title: "Signin" }
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./views/forgot-password/forgot-password.module").then(
        m => m.ForgotPasswordModule
      ),
    data: { title: "Forgot Password" }
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./views/signup/signup.module").then(m => m.SignupModule),
    data: { title: "Signup" }
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { title: "Dashboard", breadcrumb: "DASHBOARD" },
    children: [
      {
        path: "favorites",
        loadChildren: () =>
          import("./views/favorites/favorites.module").then(
            m => m.FavoritesModule
          ),

        data: { title: "Favorites", breadcrumb: "FAVORITES" }
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./views/profile/profile.module").then(m => m.ProfileModule),
        data: { title: "Material", breadcrumb: "MATERIAL" }
      },
      {
        path: "offers",
        loadChildren: () =>
          import("./views/offers/offers.module").then(m => m.OffersModule),
        data: { title: "Offers", breadcrumb: "Offers" }
      },
      {
        path: "my-offers",
        loadChildren: () =>
          import("./views/offers/offers.module").then(m => m.OffersModule),
        data: { title: "Offers", breadcrumb: "Offers" }
      },
    ]
  },
  {
    path: "**",
    redirectTo: "sessions/404"
  }
];
