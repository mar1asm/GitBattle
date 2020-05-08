import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

interface ISimpleProfile{
  login: string,
  image: string,
  profileLink: string, 
  count:number
}

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profiles: ISimpleProfile[]=[];
  topProfiles: ISimpleProfile[]=[];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles() {
    this.homeService.getMostSearched().subscribe(data => {
      this.profiles = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as ISimpleProfile;
      });
      this.profiles.sort((a,b) => a.count<b.count? 1: a.count==b.count? 0:-1);
        for (let index = 0; index < 10; index++) {
          this.topProfiles[index] = this.profiles[index];
        }
    });
    
  }

}
