import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as topSelectors from '../store/selectors/top.selectors';
import * as topState from '../store/state/top.state'
import * as topActions from '../store/actions/top.actions';
import { TopService } from '../services/top.service';
import { IProfile } from '../profile/Iprofile';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  compareBy: string;
  compareByLanguage: string;
  loading=false;

  topProfiles: IProfile[] = [];
  
  
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  languages = ['Any', 'JavaScript', 'Java', 'Python', 'HTML', 'C%2B%2B', 'C%23', 'PHP', 'Ruby', 'C', 'CSS'];

  constructor(private store: Store<topState.State>,
    private topService: TopService) { }

  ngOnInit(): void {
    this.store.pipe(select(topSelectors.getTopState)).subscribe(
      compareBy => {
        this.loading=true;
        this.compareBy = compareBy.sortBy;
        this.compareByLanguage = compareBy.sortByLanguage;
        this.topService.searchTopData(this.compareBy, this.compareByLanguage).then(() => {
          this.topProfiles = this.topService.getTopData();
          this.viewport.scrollToIndex(0);
          setTimeout(() => {
            this.loading=false;
          }, 1000);
        });
      });
  }

  filterChecked(name: string, filter: string) {
    switch (name) {
      case 'Language':
        this.store.dispatch(new topActions.SetSortByLanguage(filter));
        break;
      case 'Sort':
        this.store.dispatch(new topActions.SetSortBy(filter));
        break;
      default:
        break;
    }
  }
}
