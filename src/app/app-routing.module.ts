import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{ path: "login", component: LoginComponent},{ path: "listUsers", component: ListUsersComponent},{ path: "register", component: RegisterComponent}];
@NgModule({  
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
