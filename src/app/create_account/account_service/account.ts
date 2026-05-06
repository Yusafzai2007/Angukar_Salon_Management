import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Account {
  
   
   private url:string = "http://localhost:4000/api/v1/salon"
  
  constructor(private http:HttpClient){}

 
  signup(userdata:any){
    return this.http.post(`${this.url}/signup`,userdata)
  }

  login(userdata:any){
    return this.http.post(`${this.url}/login`,userdata,{
      withCredentials:true
    })
  }
   

}
