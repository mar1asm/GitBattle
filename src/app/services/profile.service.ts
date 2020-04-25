import { Injectable } from '@angular/core';
import { IProfile } from '../components/profile/profile';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private cliendId: string;
  private cliendSecret: string;

  private apiRoot: string = 'https://api.github.com/users/';
  private loading: boolean;
  private profile: IProfile;

  constructor(private http: HttpClient) {
    this.loading = false;
    this.profile = null;
  }


  searchProfile(username: string) {
    let promise = new Promise((resolve, reject) =>{
      let apiUrl = `${this.apiRoot}${username}`;
    this.http.get(apiUrl).toPromise().then(
      (res:IProfile) => {
        this.profile=res;
        resolve();
      },
      msg =>{
        reject();
      }
    )
    });
    return promise;
  }

  getProfileData():IProfile{
    if (this.profile)
    return this.profile; else
    return null;
  }
}
