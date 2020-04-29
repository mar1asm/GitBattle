import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BattleComponent } from './battle.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
    {
      path: '',
      component: BattleComponent
    },
    {
      path:'profiles',
      component: ProfileComponent
    }
  ];

  @NgModule({
      imports:[RouterModule.forChild(routes)],
      exports:[RouterModule]
  })
  export class BattleRoutingModule{}