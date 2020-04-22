import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';   //getting data
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private cliendId:string;
  private cliendSecret: string;

  constructor(private http:Http) { 
  }

  getProfileData(username:string){
    return this.http.get("https://api.github.com/users/"+username)
                .pipe(map(res =>res.json()));
  }
}
