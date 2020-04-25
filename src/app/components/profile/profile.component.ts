import { Component, OnInit } from '@angular/core';
import { IProfile } from './profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromBattle from '../battle/state/battle.reducer'
import * as battleActions from '../battle/state/battle.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  firstProfileName = '';
  secondProfileName = '';

  firstProfileScore = 0;
  secondProfileScore = 0;

  firstProfile: IProfile;
  secondProfile: IProfile;

  private loading = false;

  constructor(private profileService: ProfileService,
    private route: ActivatedRoute,
    private store: Store<fromBattle.State>) {
  }

  ngOnInit(): void {
    this.secondProfileName = this.route.snapshot.queryParamMap.get('p2');
    this.firstProfileName = this.route.snapshot.queryParamMap.get('p1');
    this.doSearch();
  }

  doSearch() {
    this.loading = true;  //add some loading animation
    this.profileService.searchProfile(this.firstProfileName).then(() => {
      this.firstProfile = this.profileService.getProfileData();
      this.profileService.searchProfile(this.secondProfileName).then(() => {
        this.secondProfile = this.profileService.getProfileData();
        this.loading = false;
        if (this.firstProfile && this.secondProfile) {
          this.getComparisonOptions();
        } else {
          console.log('error');
        }
      })
    });
  }

  getComparisonOptions() {
    this.store.pipe(select(fromBattle.getBattleState)).subscribe(
      compareBy => {
        this.calculateScore(compareBy);
        console.log(this.firstProfileScore);
        console.log(this.secondProfileScore);
      }
    );
  }



  calculateScore(compareBy: fromBattle.BattleState): void {
    if (compareBy.compareByRepos) {
      this.firstProfileScore += this.firstProfile.public_repos;
      this.secondProfileScore += this.secondProfile.public_repos;
    }

    if (compareBy.compareByGists) {
      this.firstProfileScore += this.firstProfile.public_gists;
      this.secondProfileScore += this.secondProfile.public_gists;
    }
    if (compareBy.compareByFollowers) {
      this.firstProfileScore += this.firstProfile.followers;
      this.secondProfileScore += this.secondProfile.followers;
    }
    if (compareBy.compareByBlog) {
      if (this.firstProfile.blog)
        this.firstProfileScore += 10;
      if (this.secondProfile.blog)
        this.secondProfileScore += 10;
    }
    if (compareBy.compareByCompany) {
      if (this.firstProfile.company)
        this.firstProfileScore += 100;
      if (this.secondProfile.company)
        this.secondProfileScore += 100;
    }
    if (compareBy.compareByVechime) {
      if (this.firstProfile.created_at > this.firstProfile.created_at)
        this.firstProfileScore += 10; else
        if (this.firstProfile.created_at < this.firstProfile.created_at)
          this.secondProfileScore += 10;
    }
  }


}
