import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'
import { Element } from '@angular/compiler';




@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  message="";
  displayedColumns: string[] = ['userId', 'userName', 'userLastname', 'userEmail','userLogin','userPassword','userState','opciones'];
  dataSource = new MatTableDataSource<any>();
  data: any[] = new Array();

  constructor(private http: HttpClient,private router: Router) { }
  
  ngOnInit(): void {
    try
    {
  
      this.message="";
      
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
                this.data.push( {userId: element.userId,
                  userName: element.userName,
                  userLastname: element.userLastname,
                  userEmail: element.userEmail,
                  userLogin: element.userLogin,
                  userPassword: element.userPassword,
                  userState: element.userState
                } );
                }
               );
            
               this.dataSource = new MatTableDataSource<any>(this.data);
              this.message="Usuarios obtenidos correctamente";
            }
            else
            {
              this.dataSource = new MatTableDataSource<any>(this.data);
              this.message="No se pudieron obtener los usuarios";

            }
        },
        error: (error:any) => {
            console.log(error);
            this.message="No se pudieron obtener los usuarios " + error;
            this.dataSource = new MatTableDataSource<any>(this.data);
          }
        }      
      );      
    }catch(error)
    {
      console.log(error);
    }
  }

  abrirUpdate(element:any)
  {
    try
    {
      let id = element.userId;
      this.router.navigate(['/', 'update', id] );
    }
    catch(error)
    {
      console.log(error);
    }
  }

  desactivar(element:any)
  {
    try
    {
      let id = element.userId;
      this.router.navigate(['update'], { queryParams: { id:id } });   
    }
    catch(error)
    {
      console.log(error);
    }
  }
  
}
