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
      
      var urlApi = "http://localhost:9091/loginapp/api/users/create";
      // var urlApi = "https://accepted-tortoise-remarkably.ngrok-free.app/loginapp/api/users/create";
      var httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',          
          })
        };      
      let json = {
        userName: this.form.controls["userName"].value,   
        userEmail: this.form.controls["userEmail"].value,
        userLogin: this.form.controls["userLogin"].value,
        userPassword: this.form.controls["userPassword"].value,
      };
      
      this.http.post<any>(urlApi, json, httpOptions).subscribe({
        next: (response:any) =>  {  
            if (response.code==201)
            {
              this.messageLogin="Usuario ingresado correctamente";  
              this.form.controls["userName"].setValue('');
              this.form.controls["userEmail"].setValue('');
              this.form.controls["userLogin"].setValue('');
              this.form.controls["userPassword"].setValue('');
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
