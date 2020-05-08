import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/reducers/profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { profileEffects } from '../store/effects/profile.effects';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports:[
        SharedModule,
        StoreModule.forFeature('profile', reducer),
        EffectsModule.forFeature([profileEffects])
    ],
    declarations:[ProfileComponent]
})
export class ProfileModule { }