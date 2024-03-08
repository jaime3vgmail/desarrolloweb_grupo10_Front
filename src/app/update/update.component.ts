import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  messageLogin=""
  userName="";
  userEmail="";
  userLogin="";
  userPassword="";
  form!: FormGroup;
  params : any;
  id="";
  constructor(private http: HttpClient,private router: Router,private formBuilder: FormBuilder) { }
  

  ngOnInit() {

    this.form = this.formBuilder.group(
      {      
        
        userName: ['',Validators.required],
        userEmail: ['', Validators.required],
        userLogin: ['', Validators.required],
        userPassword: ['', Validators.required],
        userState: ['', Validators.required],
      });      

     let url=this.router.url;
     this.id=url.substring(url.lastIndexOf( "/" )+1);      
     this.cargarUsuario();
      
  }

  cargarUsuario()
  {
    var urlApi = "http://localhost:9091/loginapp/api/users/list";
    // var urlApi = "https://accepted-tortoise-remarkably.ngrok-free.app/loginapp/api/users/list";
    var httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',          
        })
      };      

    this.http.get<any>(urlApi,httpOptions).subscribe({
      next: (response:any) =>  {  
          if (response.code==200)
          {
            response.data.forEach((element:any) => {

              if (element.userId==this.id)
              {
                this.form.controls["userName"].setValue(element.userName);
                this.form.controls["userEmail"].setValue(element.userEmail);
                this.form.controls["userLogin"].setValue(element.userLogin);
                this.form.controls["userPassword"].setValue(element.userPassword);
                this.form.controls["userState"].setValue(element.userState);
              }
              this.messageLogin="Usuario Cargado correctamente";                          
            }
             );
          }          
      },
      error: (error:any) => {
          console.log(error);
          this.messageLogin="No se pudieron obtener los usuarios " + error;
          
        }
      }      
    );      
  }

  onSubmit(): void {
    try
    {
      
      this.messageLogin="";
      
      var urlApi = "http://localhost:9091/loginapp/api/users/update/"+this.id;
      // var urlApi = "https://accepted-tortoise-remarkably.ngrok-free.app/loginapp/api/users/login";
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
          userState: this.form.controls["userState"].value,
  
        };
   
      
      this.http.put<any>(urlApi, json, httpOptions).subscribe({
        next: (response:any) =>  {  
            if (response.code==200)
            {
              this.messageLogin="Usuario actualizado correctamente";               
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
