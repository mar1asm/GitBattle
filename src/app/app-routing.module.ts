import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BattleRoutingModule } from './battle/battle.routing.module';


const routes: Routes = [
  {
    path:'home', component: HomeComponent
  },
  {
    path:'top', 
    loadChildren: ()=>import('./top/top.module').then(m=>m.TopModule)
  },
  {
    path:'battle', 
    loadChildren: ()=>import('./battle/battle.module').then(m=>m.BattleModule)
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
