import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromTop from './state/top.reducer';
import * as topActions from './state/top.actions';
import { TopService } from '../../services/top.service';
import { IProfile } from '../profile/profile';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  compareBy: string;
  compareByLanguage: string;

  topProfiles: IProfile[] = [];
  
  
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  languages = ['Any', 'JavaScript', 'Java', 'Python', 'HTML', 'C%2B%2B', 'C%23', 'PHP', 'Ruby', 'C', 'CSS'];

  constructor(private store: Store<fromTop.State>,
    private topService: TopService) { }

  ngOnInit(): void {
    this.store.pipe(select(fromTop.getTopState)).subscribe(
      compareBy => {
        this.compareBy = compareBy.sortBy;
        this.compareByLanguage = compareBy.sortByLanguage;
        this.topService.searchTopData(this.compareBy, this.compareByLanguage).then(() => {
          this.topProfiles = this.topService.getTopData();
          this.viewport.scrollToIndex(0);
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
