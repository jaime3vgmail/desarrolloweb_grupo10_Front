import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  messageLogin=""
  usuario="";
  contrasena="";
  form!: FormGroup;
  constructor(private http: HttpClient,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group(
      {      
        
        usuario: ['',Validators.required],
        tipoDocumento: ['', Validators.required]
      });      
  }

  onSubmit(): void {
    try
    {
      
      this.messageLogin="";
      
      // var urlApi = "localhost:9091/loginapp/api/users/login";
      var urlApi = "https://accepted-tortoise-remarkably.ngrok-free.app/loginapp/api/users/login";
      var httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',          
          })
        };      
      let json = {
        userLogin: this.usuario,
        contrasena: this.contrasena
      };    
   
      
      this.http.post<any>(urlApi, json, httpOptions).subscribe({
        next: (response:any) =>  {  
            if (response.code==200)
            {
              this.router.navigate(['listarUsuarios']);                 
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
