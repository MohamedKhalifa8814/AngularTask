import { IUser } from './../Interface/iuser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl: string = "https://dummyjson.com/user";
  authToken: string = ""
  // currentUser = new IUser ;

  constructor(private http: HttpClient) { }


  login(log: string) {
    this.http.post(this.baseUrl + '/login', log)
    // .pipe(
    //   map((user: any) => {
    //     if (user) {
    //       localStorage.setItem('token', user.);
    //     }
    //   })
    // )
  }


  getToken() {
    this.http.get(this.baseUrl)
    return this.authToken || localStorage.getItem("authToken")
  }
}

