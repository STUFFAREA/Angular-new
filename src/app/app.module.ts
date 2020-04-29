import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { TokenInterceptor } from './shared/auth-interceptor.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { ListService } from './shared/list.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { NewListComponent } from './new-list/new-list.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PagenotfoundComponent,
    DashboardComponent,
    LoadingSpinnerComponent,
    EditProfileComponent,
    HomeComponent,
    NewListComponent,
    EditPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule
  ],
  providers: [AuthGuard,
              ListService
              // {provide : HTTP_INTERCEPTORS,
              // useClass: TokenInterceptor,
              // multi:true
              // }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
