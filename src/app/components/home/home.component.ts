import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

export interface IUser{
  login: string,
  id: number, 
  count:number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:IUser={
    login: 'ms',
    id: 3,
    count: 6
  };
  users: IUser[]=[];
  constructor(private homeService: HomeService) {
    
  }

  ngOnInit(): void {
    this.getUsers();
    this.addNew();
    
  }

  getUsers() {
    // we call getEmployees() from EmployeeService to get list of employees
    this.homeService.getMostSearched().subscribe(data => {
      // this.employees stores list of employee
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as IUser;
      });
    });
  }

  addNew(){
   // this.homeService.addUser(this.user);
    this.homeService.updateUser('usersssssz');
  }

}
