import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { reducer } from '../store/reducers/battle.reducer';
import { BattleRoutingModule } from './battle.routing.module';
import { BattleComponent } from './battle.component';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports:[
        SharedModule,
        BattleRoutingModule,
        ProfileModule,
        StoreModule.forFeature('battle', reducer),
    ],
    declarations:[BattleComponent]
})
export class BattleModule { }