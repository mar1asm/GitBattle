import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { IProfile } from './IProfile';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Chart } from 'chart.js';

import * as battleState from '../store/state/battle.state';
import * as battleSelectors from '../store/selectors/battle.selectors';
import * as profileSelectors from '../store/selectors/profile.selectors';
import * as profileState from '../store/state/profile.state';
import * as profileActions from '../store/actions/profile.actions';
import { HomeService } from '../services/home.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  firstProfile = {
    profile: <IProfile>null,
    name: <string>null,
    score: <number>0,
    values: <number[]>[],
    loaded: <boolean>false
  }
  secondProfile = {
    profile: <IProfile>null,
    name: <string>null,
    score: <number>0,
    values: <number[]>[],
    loaded: <boolean>false
  }

  loading = true;
  loaded = false;
  hasError = false;
  error: string;
  winner: number;
  profiles: IProfile[] = [];
  criteria: string[] = [];

  chart = false;

  constructor(private profileService: ProfileService,
    private homeService: HomeService,
    private route: ActivatedRoute,
    private battleStore: Store<battleState.BattleState>,
    private profileStore: Store<profileState.ProfileState>,
    private router: Router,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.firstProfile.name = this.route.snapshot.queryParamMap.get('p1');
    this.secondProfile.name = this.route.snapshot.queryParamMap.get('p2');
    this.doSearch();
  }

  doSearch() {
    this.profileStore.dispatch(new profileActions.SetFirstProfile(this.firstProfile.name));
    this.profileStore.dispatch(new profileActions.SetSecondProfile(this.secondProfile.name));

    const firstProfileSubscription = this.profileStore.pipe(select(profileSelectors.getFirstProfile)).subscribe(
      firstProfile => {
        this.firstProfile.profile = firstProfile;
      }
    );

    const secondProfileSubscription = this.profileStore.pipe(select(profileSelectors.getSecondProfile)).subscribe(
      secondProfile => {
        this.secondProfile.profile = secondProfile;
      }
    );

    const errorSub = this.profileStore.pipe(select(profileSelectors.getError)).subscribe(
      error => {
        if (error) {
          this.error = 'Profile Not Found';
          this.hasError = true;
        }
      }
    );

    const loadedSub = this.profileStore.pipe(select(profileSelectors.haveLoaded)).subscribe(
      (loaded: boolean[]) => {
        if (loaded[0] && loaded[1] && !this.loaded) {
          this.loading = false;
          this.loaded = true;
          firstProfileSubscription.unsubscribe();
          secondProfileSubscription.unsubscribe();
          errorSub.unsubscribe();
          this.profiles.push(this.firstProfile.profile, this.secondProfile.profile);
          this.getComparisonOptions();
        }

      }
    )
    if (!this.loading)
      loadedSub.unsubscribe();
  }

  getComparisonOptions() {
    let compareSub=this.battleStore.pipe(select(battleSelectors.getBattleState)).subscribe(
      compareBy => {
        if (!compareBy.compareByBlog && !compareBy.compareByCompany && !compareBy.compareByFollowers && !compareBy.compareByGists && !compareBy.compareByRepos && !compareBy.compareByDate) {
          this.hasError = true;
          this.error = 'Didnt select any comparison options';
        } else
          this.calculateScore(compareBy);
      }
    );
    compareSub.unsubscribe();
  }



  calculateScore(compareBy: battleState.IBattleState): void {
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

    if (compareBy.compareByDate) {
      let month = 60 * 60 * 24 * 365 / 12 * 1000;
      let today = new Date();
      let firstProfileMonthsActive = (today.valueOf() - Date.parse(this.firstProfile.profile.created_at)) / month;
      let secondProfileMonthsActive = (today.valueOf() - Date.parse(this.secondProfile.profile.created_at)) / month;
      let totalMonthsActive = firstProfileMonthsActive + secondProfileMonthsActive;

      this.firstProfile.score += firstProfileMonthsActive / totalMonthsActive * 100;
      this.secondProfile.score += secondProfileMonthsActive / totalMonthsActive * 100;

      this.firstProfile.values.push(firstProfileMonthsActive);
      this.secondProfile.values.push(secondProfileMonthsActive);

      this.criteria.push("Number of active months");
    }
    if (this.firstProfile.score > this.secondProfile.score)
      this.winner = 0; else
      this.winner = 1;
    this.update();
  }

  update() {
    this.homeService.updateUser(this.firstProfile.profile);
    this.homeService.updateUser(this.secondProfile.profile);
    this.profileStore.dispatch(new profileActions.ResetProfiles);

    this.chart = this.criteria.length > 1 ? true : false;
    if (this.chart)
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
    this.cdr.detectChanges();
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

  goBack() {
    this.profileStore.dispatch(new profileActions.ResetProfiles);
    this.router.navigate(['battle']);
  }

}
