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

  firstProfile={
    profile : <IProfile> null,
    name: <string> null,
    score: <number>0
  }
  secondProfile={
    profile : <IProfile> null,
    name: <string> null,
    score: <number>0
  }

  private loading = false;

  constructor(private profileService: ProfileService,
    private route: ActivatedRoute,
    private store: Store<fromBattle.State>) {
  }

  ngOnInit(): void {
    this.firstProfile.name = this.route.snapshot.queryParamMap.get('p1');
    this.secondProfile.name = this.route.snapshot.queryParamMap.get('p2');
    this.doSearch();
  }

  doSearch() {
    this.loading = true;  //add some loading animation
    this.profileService.searchProfile(this.firstProfile.name).then(() => {
      this.firstProfile.profile = this.profileService.getProfileData();
      this.profileService.searchProfile(this.secondProfile.name).then(() => {
        this.secondProfile.profile = this.profileService.getProfileData();
        this.loading = false;
        if (this.firstProfile.profile && this.secondProfile.profile) {
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
      }
    );
  }



  calculateScore(compareBy: fromBattle.BattleState): void {
    if (compareBy.compareByRepos) {
      this.firstProfile.score += this.firstProfile.profile.public_repos;
      this.secondProfile.score += this.secondProfile.profile.public_repos;
    }

    if (compareBy.compareByGists) {
      this.firstProfile.score += this.firstProfile.profile.public_gists;
      this.secondProfile.score += this.secondProfile.profile.public_gists;
    }
    if (compareBy.compareByFollowers) {
      this.firstProfile.score += this.firstProfile.profile.followers;
      this.secondProfile.score += this.secondProfile.profile.followers;
    }
    if (compareBy.compareByBlog) {
      if (this.firstProfile.profile.blog)
        this.firstProfile.score += 10;
      if (this.secondProfile.profile.blog)
        this.secondProfile.score += 10;
    }
    if (compareBy.compareByCompany) {
      if (this.firstProfile.profile.company)
        this.firstProfile.score += 100;
      if (this.secondProfile.profile.company)
        this.secondProfile.score += 100;
    }
    if (compareBy.compareByVechime) {
      if (this.firstProfile.profile.created_at > this.firstProfile.profile.created_at)
        this.firstProfile.score += 10; else
        if (this.firstProfile.profile.created_at < this.firstProfile.profile.created_at)
          this.secondProfile.score += 10;
    }
  }


}
