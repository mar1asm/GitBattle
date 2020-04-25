import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BattleComponent } from './components/battle/battle.component';
import { HomeComponent } from './components/home/home.component';
import { TopComponent } from './components/top/top.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BattleModule } from './components/battle/battle.module';
import { AboutComponent } from './components/about/about.component';


const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'top', component: TopComponent},
  {path:'about', component: AboutComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    BattleModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
