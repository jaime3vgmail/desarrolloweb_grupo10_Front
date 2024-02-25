import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [AppComponent,LoginComponent,RegisterComponent,ListUsersComponent],
  imports: [BrowserModule,AppRoutingModule,CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule,MatTableModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
