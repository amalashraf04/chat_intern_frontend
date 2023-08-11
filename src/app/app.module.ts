import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule

import { BackendService } from './backend.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddfriendComponent } from './addfriend/addfriend.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AddpicComponent } from './addpic/addpic.component';
import { HeaderComponent } from './header/header.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ImguploadComponent } from './imgupload/imgupload.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    AddfriendComponent,
    LandingComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
   AddpicComponent,
   ImguploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  
  ],
  providers: [BackendService,AuthGuard,
    {
    
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
