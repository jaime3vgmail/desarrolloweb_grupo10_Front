import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'

export interface Element {
  userId: number;
  userName: string;
  userLastname: string;
  userEmail: string;
  userLogin:string;
  userPassword:string;
  userState:boolean;
}

const ELEMENT_DATA: Element[] = [
  {
    userId: 1,
    userName: "NombreUsuario",
    userLastname: "",
    userEmail: "correo@example.com",
    userLogin: "nombreusuario",
    userPassword: "contraseña",
    userState: false
}
 
];

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  message="";
  displayedColumns: string[] = ['userId', 'userName', 'userLastname', 'userEmail','userLogin','userPassword','userState','opciones'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  

  constructor(private http: HttpClient,private router: Router) { }
  
  ngOnInit(): void {
    try
    {
  
      this.message="";
      
      // var urlApi = "localhost:9091/loginapp/api/users/login";
      var urlApi = "https://accepted-tortoise-remarkably.ngrok-free.app/loginapp/api/users/list";
      var httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',          
          })
        };      

      this.http.get<any>(urlApi,httpOptions).subscribe({
        next: (response:any) =>  {  
            if (response.code==200)
            {
              
            }
            else
            {
              this.message="No se pudieron obtener los usuarios";
            }
        },
        error: (error:any) => {
            console.log(error);
            this.message="No se pudieron obtener los usuarios " + error;
          }
        }      
      );      
    }catch(error)
    {
      console.log(error);
    }
  }

  
}
