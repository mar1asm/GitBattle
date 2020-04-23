import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  _username='';
  cauta=false;
  constructor(private router: Router
  ) { }
  

  ngOnInit(): void {
  }


  onBattle(value:string):void{
    this._username=value;
    console.log(this._username);
    if (this._username)
      {
        this.router.navigate(['/profiles'],
        {
          queryParams:{p1: this._username, p2: this._username}
        });
        
      } else
      this.cauta=false;
  }

}
