import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BattleComponent } from './battle.component';
import { ProfileComponent } from '../profile/profile.component';

@NgModule({
    imports:[
        RouterModule.forChild([
            {path: 'battle', component: BattleComponent},
            {path: 'battle/:profileId', component: ProfileComponent}
        ]),
        FormsModule
    ],
    declarations:[
    ]
})
export class BattleModule { }