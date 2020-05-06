import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BattleRoutingModule } from './components/battle/battle.routing.module';


const routes: Routes = [
  {
    path:'home', component: HomeComponent
  },
  {
    path:'top', 
    loadChildren: ()=>import('./components/top/top.module').then(m=>m.TopModule)
  },
  {
    path:'battle', 
    loadChildren: ()=>import('./components/battle/battle.module').then(m=>m.BattleModule)
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
    BattleRoutingModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
