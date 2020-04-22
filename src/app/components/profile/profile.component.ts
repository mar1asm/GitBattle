import { Component, OnInit } from '@angular/core';
import { IProfile } from './profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: IProfile;

  constructor(private profileService: ProfileService) {
    this.profileService.getProfileData('mar1asm').subscribe(profile => {
      this.profile=profile;
    });
   }

  ngOnInit(): void {
  }


}
