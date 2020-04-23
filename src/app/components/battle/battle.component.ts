import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  _username1='';
  _username2='';
  cauta=false; /* vezi ce faci aici*/
  
  filters:string[]=['repos',' blogs',' blogs', 'jidfs', 'fdsf','jidfs','jidfs','jidfs'];
  bFilters:boolean[];
  filter:string;
  constructor(private router: Router
  ) { }
  

  ngOnInit(): void {
  }


  onSubmit(username1:string, username2:string):void{
    this._username1=username1;
    this._username2=username2;
    console.log(this._username1);

    if (this._username1 && this._username2)
      {
        this.router.navigate(['/profiles'],
        {
          queryParams:{p1: this._username1, p2: this._username2}
        });
        
      } else
      this.cauta=false;
  }
  filterClicked(filter:string)
  {
    this.filter=filter;
    console.log(filter);
  }
  

}
