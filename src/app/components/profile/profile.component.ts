import { Component, OnInit } from '@angular/core';
import { IProfile } from './profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: IProfile;
  firstProfileName: string;
  secondProfileName: string;

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute) {
    this.firstProfileName=this.route.snapshot.queryParamMap.get('p1');
    this.secondProfileName=this.route.snapshot.queryParamMap.get('p2');
    this.profileService.getProfileData(this.firstProfileName)
        .subscribe(profile => {this.profile=profile;
    });
   }

  ngOnInit(): void {
  }


}
