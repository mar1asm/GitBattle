import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CommonModule} from '@angular/common'

import { reducer } from './state/battle.reducer';
import { BattleRoutingModule } from './battle.routing.module';
import { BattleComponent } from './battle.component';

@NgModule({
    imports:[
        FormsModule,  //toDo: move these to a shared module
        ReactiveFormsModule,
        BattleRoutingModule,
        StoreModule.forFeature('battle', reducer),
        CommonModule
    ],
    declarations:[BattleComponent]
})
export class BattleModule { }