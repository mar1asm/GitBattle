import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { BattleComponent } from './battle.component';
import { ProfileComponent } from '../profile/profile.component';
import { reducer } from './state/battle.reducer';

@NgModule({
    imports:[
        RouterModule.forChild([
            {path: 'battle', component: BattleComponent},
            {path: 'profiles', component: ProfileComponent}
        ]),
        FormsModule,
        StoreModule.forFeature('battle', reducer)
    ],
    declarations:[]
})
export class BattleModule { }