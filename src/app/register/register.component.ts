import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  messageLogin=""
  userName="";
  userEmail="";
  userLogin="";
  userPassword="";
  form!: FormGroup;
  constructor(private http: HttpClient,private router: Router,private formBuilder: FormBuilder) { }
  

  ngOnInit() {

    this.form = this.formBuilder.group(
      {      
        
        userName: ['',Validators.required],
        userEmail: ['', Validators.required],
        userLogin: ['', Validators.required],
        userPassword: ['', Validators.required],
      });      
  }

  onSubmit(): void {
    try
    {
      
      this.messageLogin="";
      
      // var urlApi = "localhost:9091/loginapp/api/users/login";
      var urlApi = "https://accepted-tortoise-remarkably.ngrok-free.app/loginapp/api/users/create";
      var httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',          
          })
        };      
      let json = {
        userName: this.userName,
        userEmail: this.userEmail,
        userLogin: this.userLogin,
        userPassword: this.userPassword
      };
      
      this.http.post<any>(urlApi, json, httpOptions).subscribe({
        next: (response:any) =>  {  
            if (response.code==200)
            {
              this.messageLogin="Usuario ingresado correctamente";           
            }
            else
            {
              this.messageLogin=response.message;
            }
        },
        error: (error:any) => {
          
            console.log(error);
            this.messageLogin=error.toString();
           
          }
        }      
      );      
    }catch(error)
    {
      console.log(error);
    }
  }
  

}
