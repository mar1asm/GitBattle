import { Injectable } from '@angular/core';
import { IProfile } from '../components/profile/IProfile';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';

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

  constructor(private http: HttpClient,
              private profileService: ProfileService) {
    this.topProfiles = null;
  }

  searchTopData(query: string, language: string) {

    let sortBy=query=='repos'? 'repositories': 'followers';
    if (language!='Any') {
      this.apiUrl = `${this.apiRoot}q=language:${language}+sort:${sortBy}&${this.clientId}&${this.clientSecret}&per_page=100`;
    }
    else {
      this.apiUrl = `${this.apiRoot}q=${query}:%3E10+sort:${sortBy}&${this.clientId}&${this.clientSecret}&per_page=100`;
    }
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.apiUrl).toPromise().then(
        (res: ITopProfiles) => {
          this.topProfiles=res;
          for (let i=0; i<100; i++){
            //this.profileService.searchProfile(res.items[i].login).then(
            //  ()=>{
            //this.topProfiles.items[i]=this.profileService.getProfileData();
          //});
        }
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
