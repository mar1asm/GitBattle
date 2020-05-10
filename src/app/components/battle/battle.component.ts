import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as battleState from '../../store/state/battle.state';
import * as battleActions from '../../store/actions/battle.actions';
import * as battleSelectors from '../../store/selectors/battle.selectors';

@Component({
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements AfterViewInit, OnInit {

  _username1='';
  _username2=''; 
  ready: boolean=false;

  compareBy:string[]=['Repos','Gists','Blog','Followers', 'Company', 'Date Created'];
  bCompareBy:boolean[]=[true, true, true, true, true, true, true]; 

  constructor(private router: Router,
              private store: Store<battleState.BattleState>,
              private cdr: ChangeDetectorRef) { }
  

  ngOnInit(): void {
    this.store.pipe(select(battleSelectors.getBattleState)).subscribe(
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
        this.router.navigate(['battle/profiles'],
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
