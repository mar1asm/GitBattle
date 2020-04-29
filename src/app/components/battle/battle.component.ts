import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromBattle from './state/battle.reducer';
import * as battleActions from './state/battle.actions';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements AfterViewInit, OnInit {

  _username1='';
  _username2=''; 
  ready: boolean=false;

  compareBy:string[]=['repos','gists','blog','followers', 'company', 'vechime', 'profile completeness'];
  bCompareBy:boolean[]=[true, true, true, true, true, true, true, true, true];  /*aici trebuie sa fac altfel */
  filtersName:string[]=['compareByRepos'];

  constructor(private router: Router,
              private store: Store<fromBattle.State>,
              private cdr: ChangeDetectorRef) { }
  

  ngOnInit(): void {
    this.store.pipe(select(fromBattle.getBattleState)).subscribe(
      compareBy => {
        let i=0;
        for (let com in compareBy){
          this.bCompareBy[i++]=compareBy[com];
        }
      });
  }
  ngAfterViewInit(){
    this.ready = true; 
    this.cdr.detectChanges();
  }


  onSubmit(username1:string, username2:string):void{
    this._username1=username1;
    this._username2=username2;

    if (this._username1 && this._username2)
      {
        this.router.navigate(['/profiles'],
        {
          queryParams:{p1: this._username1, p2: this._username2}
        });
        
      }
  }


  filterChecked(compareById:number, value:boolean)
  {
    let i=-1;
    for (let com in battleActions){
      if (i++==compareById){
        this.store.dispatch(new battleActions[com](value));
      }
    }
  }
}
