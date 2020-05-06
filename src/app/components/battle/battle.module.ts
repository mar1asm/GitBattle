import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CommonModule} from '@angular/common'

import { reducer } from '../../store/reducers/battle.reducer';
import { BattleRoutingModule } from './battle.routing.module';
import { BattleComponent } from './battle.component';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
    imports:[
        FormsModule,  //toDo: move these to a shared module
        ReactiveFormsModule,
        BattleRoutingModule,
        ProfileModule,
        StoreModule.forFeature('battle', reducer),
        CommonModule,
    ],
    declarations:[BattleComponent]
})
export class BattleModule { }