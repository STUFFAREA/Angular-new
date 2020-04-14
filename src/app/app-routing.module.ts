import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [  
{  path : '' ,redirectTo :'/login', pathMatch:'full' }, 
{  path : 'login' ,component :LoginComponent }, 
{  path : 'register' ,component :RegisterComponent }, 
{  path : 'dashboard' , canActivate: [AuthGuard] ,component :DashboardComponent }, 
{  path : '**' , component : PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
