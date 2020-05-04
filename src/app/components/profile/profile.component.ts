import { Component, OnInit } from '@angular/core';
import { IProfile } from './profile';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Chart } from '../../../../node_modules/chart.js';

import * as fromBattle from '../battle/state/battle.reducer';
import * as fromProfile from './state/profile.reducer';
import * as profileActions from './state/profile.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  firstProfile = {
    profile: <IProfile>null,
    name: <string>null,
    score: <number>0,
    values: <number[]>[]
  }
  secondProfile = {
    profile: <IProfile>null,
    name: <string>null,
    score: <number>0,
    values: <number[]>[]
  }

  private loading = false;
  hasError = false;
  winner: number;
  profiles: IProfile[] = [];
  criteria: string[] = [];

  constructor(private profileService: ProfileService,
    private route: ActivatedRoute,
    private battleStore: Store<fromBattle.State>,
    private profileStore: Store<fromProfile.State>,
    private router: Router) {
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
      this.profileStore.dispatch(new profileActions.SetFirstProfile(this.firstProfile.profile));
      this.profileService.searchProfile(this.secondProfile.name).then(() => {
        this.secondProfile.profile = this.profileService.getProfileData();
        this.profileStore.dispatch(new profileActions.SetSecondProfile(this.secondProfile.profile));
        this.loading = false;
        if (this.firstProfile.profile && this.secondProfile.profile) {
          this.profiles.push(this.firstProfile.profile);
          this.profiles.push(this.secondProfile.profile);
          this.getComparisonOptions();
        } else {
          console.log('error');
        }
      })
    });
  }

  getComparisonOptions() {
    this.battleStore.pipe(select(fromBattle.getBattleState)).subscribe(
      compareBy => {
        this.calculateScore(compareBy);
      }
    );
  }



  calculateScore(compareBy: fromBattle.BattleState): void {
    if (compareBy == null) {
      this.hasError = true;
      setTimeout(() => {
        this.router.navigate(['/battle']);
      }, 3000);
    }
    if (compareBy.compareByRepos) {
      let totalNumberOfRepos = this.firstProfile.profile.public_repos + this.secondProfile.profile.public_repos;
      totalNumberOfRepos = totalNumberOfRepos > 0 ? totalNumberOfRepos : 1;

      this.firstProfile.score += (this.firstProfile.profile.public_repos / totalNumberOfRepos) * 100;
      this.secondProfile.score += (this.secondProfile.profile.public_repos / totalNumberOfRepos) * 100;

      this.firstProfile.values.push(this.firstProfile.profile.public_repos);
      this.secondProfile.values.push(this.secondProfile.profile.public_repos);

      this.criteria.push("Number of repos");
    }

    if (compareBy.compareByGists) {
      let totalNumberOfGists = this.firstProfile.profile.public_gists + this.secondProfile.profile.public_gists;
      totalNumberOfGists = totalNumberOfGists > 0 ? totalNumberOfGists : 1;

      this.firstProfile.score += (this.firstProfile.profile.public_gists / totalNumberOfGists) * 100;
      this.secondProfile.score += (this.secondProfile.profile.public_gists / totalNumberOfGists) * 100;

      this.firstProfile.values.push(this.firstProfile.profile.public_gists);
      this.secondProfile.values.push(this.secondProfile.profile.public_gists);

      this.criteria.push("Number of gists");
    }
    if (compareBy.compareByFollowers) {
      let totalNumberOfFollowers = this.firstProfile.profile.followers + this.secondProfile.profile.followers;
      totalNumberOfFollowers = totalNumberOfFollowers > 0 ? totalNumberOfFollowers : 1;

      this.firstProfile.score += (this.firstProfile.profile.followers / totalNumberOfFollowers) * 100;
      this.secondProfile.score += (this.secondProfile.profile.followers / totalNumberOfFollowers) * 100;

      this.firstProfile.values.push(this.firstProfile.profile.followers);
      this.secondProfile.values.push(this.secondProfile.profile.followers);

      this.criteria.push("Number of followers");
    }
    if (compareBy.compareByBlog) {
      this.firstProfile.score += this.firstProfile.profile.blog ? this.secondProfile.profile.blog ? 50 : 100 : 0;
      this.secondProfile.score += this.secondProfile.profile.blog ? this.firstProfile.profile.blog ? 50 : 100 : 0;
    }

    if (compareBy.compareByCompany) {
      this.firstProfile.score += this.firstProfile.profile.company ? this.secondProfile.profile.company ? 50 : 100 : 0;
      this.secondProfile.score += this.secondProfile.profile.company ? this.firstProfile.profile.company ? 50 : 100 : 0;
    }
    if (compareBy.compareByVechime) {
      let month = 60 * 60 * 24 * 365 / 12 * 1000;
      let today = new Date();
      let firstProfileMonthsActive = (today.valueOf() - Date.parse(this.firstProfile.profile.created_at)) / month;
      let secondProfileMonthsActive = (today.valueOf() - Date.parse(this.secondProfile.profile.created_at)) / month;
      let totalMonthsActive = firstProfileMonthsActive + secondProfileMonthsActive;

      this.firstProfile.score += firstProfileMonthsActive / totalMonthsActive;
      this.secondProfile.score += secondProfileMonthsActive / totalMonthsActive;

      this.firstProfile.values.push(firstProfileMonthsActive);
      this.secondProfile.values.push(secondProfileMonthsActive);

      this.criteria.push("Number of active months");
    }
    if (this.firstProfile.score > this.secondProfile.score)
      this.winner = 0; else
      this.winner = 1;
    this.doChart();
  }

  doChart() {
    var data = {
      labels: this.criteria,
      datasets: [
        {
          label: this.firstProfile.name,
          backgroundColor: this.firstProfile.score > this.secondProfile.score ? "green" : "red",
          data: this.firstProfile.values
        },
        {
          label: this.secondProfile.name,
          backgroundColor: this.secondProfile.score > this.firstProfile.score ? "green" : "red",
          data: this.secondProfile.values
        }
      ]
    };
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: data,
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


}
