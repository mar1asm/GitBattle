import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../profile/state/profile.reducer';

@NgModule({
    imports:[
        StoreModule.forFeature('profile', reducer),
    ],
    declarations:[]
})
export class ProfileModule { }