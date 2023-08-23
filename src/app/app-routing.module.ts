import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from './shared/authguard.guard';

const routes: Routes = [
   { path: '', component:DashboardComponent,canActivate:[AuthguardGuard] },
   { path: 'home', component: HomeComponent},
   { path: 'dashboard',component:DashboardComponent,canActivate:[AuthguardGuard]},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
