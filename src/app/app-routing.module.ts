import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BattleComponent } from './components/battle/battle.component';
import { HomeComponent } from './components/home/home.component';
import { TopComponent } from './components/top/top.component';
import { AboutGithubComponent } from './components/about-github/about-github.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BattleModule } from './components/battle/battle.module';


const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'top', component: TopComponent},
  {path:'about', component: AboutGithubComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BattleModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
