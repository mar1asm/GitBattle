import { Injectable } from '@angular/core';
import { IProfile } from '../components/profile/profile';
import { HttpClient } from '@angular/common/http';

interface ITopProfiles {
  total_count: number,
  incomplete_results: boolean,
  items: IProfile[]
}

@Injectable({
  providedIn: 'root'
})
export class TopService {
  private clientId = 'client_id=87316d01039ecc7817a8';
  private clientSecret = 'cliend_secret=1b96319ce0f9d74ebc236eab5e1b3640b54ed1f7';

  private apiRoot: string = 'https://api.github.com/search/users?';
  private apiUrl = '';

  topProfiles: ITopProfiles;

  constructor(private http: HttpClient) {
    this.topProfiles = null;
  }

  searchTopData(query: string, language: string) {
    if (language) {
      this.apiUrl = `${this.apiRoot}q=${language}:%3E10+sort:${query}&${this.clientId}&${this.clientSecret}&per_page=100`;
    }
    else {
      this.apiUrl = `${this.apiRoot}q=${query}:%3E10+sort:${query}&${this.clientId}&${this.clientSecret}&per_page=100`;
    }

    let promise = new Promise((resolve, reject) => {
      this.http.get(this.apiUrl).toPromise().then(
        (res: ITopProfiles) => {
          this.topProfiles = res;
          console.log(this.topProfiles.items);
          resolve();
        },
        msg => {
          reject();
        }
      )
    });
    return promise;
  }

  getTopData(): IProfile[]{
    if (this.topProfiles.items)
      return this.topProfiles.items; else
      return null;
  }
}
