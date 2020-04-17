import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { NewListComponent } from './new-list/new-list.component';


const routes: Routes = [  
{  path : '' ,redirectTo :'/login', pathMatch:'full' }, 
{  path : 'login' ,component :LoginComponent }, 
{  path : 'register' ,component :RegisterComponent }, 
{  path : 'dashboard' , canActivate: [AuthGuard] ,component :DashboardComponent, children : [
  { path : '' , component :HomeComponent } ,
  { path : 'new-list', component: NewListComponent, children : [
    { path : 'edit/:id', component: NewListComponent }  
  ]},   
  { path : 'profile' , component :EditProfileComponent }   
]}, 
{  path : '**' , component : PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
