import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: any[]=[];
  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.homeService.getMostSearched().subscribe(res =>(this.users=res));
  }

}
