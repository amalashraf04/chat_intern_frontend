import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AddfriendComponent } from './addfriend/addfriend.component';
import { AddpicComponent } from './addpic/addpic.component';
import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common';

const routes: Routes = [

{
  path: '',
  component: HomeComponent
 
},
{ path: 'signup', component: SignupComponent },
{ path: 'login', component: LoginComponent },
{
  path: 'land/:id',canActivate:[AuthGuard],
  component: LandingComponent,
  children: [
    {
      path: 'chatroom',canActivate:[AuthGuard],
      component: ChatroomComponent,
      runGuardsAndResolvers: 'always' // Ensure component re-initialization
    },
    {
      path: 'chatroom/:fid',canActivate:[AuthGuard],
      component: ChatroomComponent,
      runGuardsAndResolvers: 'always' // Ensure component re-initialization
    }
  ]
},
{ path: 'addfriend/:id',canActivate:[AuthGuard], component: AddfriendComponent },
{ path :'profileimage',component:AddpicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
