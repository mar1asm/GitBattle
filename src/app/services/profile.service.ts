import { Injectable } from '@angular/core';
import { IProfile } from '../shared/IProfile';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private clientId = '87316d01039ecc7817a8';
  private clientSecret = '1b96319ce0f9d74ebc236eab5e1b3640b54ed1f7';

  private apiRoot: string = 'https://api.github.com/users/';

  constructor(private http: HttpClient) { }


  getProfileData(username: string): Observable<IProfile> {
    let apiUrl = `${this.apiRoot}${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
    return this.http.get<IProfile>(apiUrl);
  }
}
