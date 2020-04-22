import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  _username='';
  cauta=false;
  constructor() { }
  

  ngOnInit(): void {
  }


  onBattle(value:string):void{
    this._username=value;
    console.log(this._username);
    if (this._username)
      {
        this.cauta=true;
        
      } else
      this.cauta=false;
  }

}
