import { Injectable } from '@angular/core';
import { IProfile } from '../components/profile/profile';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private clientId='87316d01039ecc7817a8';
  private clientSecret='1b96319ce0f9d74ebc236eab5e1b3640b54ed1f7';

  private apiRoot: string = 'https://api.github.com/users/';
  private loading: boolean;
  private profile: IProfile;

  constructor(private http: HttpClient) {
    this.loading = false;
    this.profile = null;
  }



  searchProfile(username: string) {
    let promise = new Promise((resolve, reject) =>{
      let apiUrl = `${this.apiRoot}${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
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
