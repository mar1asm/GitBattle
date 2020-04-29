import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromTop from './state/top.reducer';
import * as topActions from './state/top.actions';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  compareByFollowers = true;
  compareByRepos = false;

  constructor(private store: Store<fromTop.State>) { }

  ngOnInit(): void {
    this.store.pipe(select(fromTop.getTopState)).subscribe(
      compareBy => {
        this.compareByFollowers = compareBy.sortByFollowers;
        this.compareByRepos = compareBy.sortByRepos;
      });
  }

  filterChecked(filter: string) {
    switch (filter) {
      case 'Followers':
        this.store.dispatch(new topActions.SetSortByFollowers(true));
        this.store.dispatch(new topActions.SetSortByRepos(false));
        break;
      case 'Repos':
        this.store.dispatch(new topActions.SetSortByFollowers(false));
        this.store.dispatch(new topActions.SetSortByRepos(true));
        break;
      case 'Js':
        this.store.dispatch(new topActions.SetSortByLanguageJs(true));
        this.store.dispatch(new topActions.SetSortByLanguageCpp(false));
        this.store.dispatch(new topActions.SetSortByLanguagePython(false));
        break;
      case 'Cpp':
        this.store.dispatch(new topActions.SetSortByLanguageJs(false));
        this.store.dispatch(new topActions.SetSortByLanguageCpp(true));
        this.store.dispatch(new topActions.SetSortByLanguagePython(false));
        break;
      case 'Python':
        this.store.dispatch(new topActions.SetSortByLanguageJs(false));
        this.store.dispatch(new topActions.SetSortByLanguageCpp(false));
        this.store.dispatch(new topActions.SetSortByLanguagePython(true));
        break;
      default:
        break;

    }
  }

}
