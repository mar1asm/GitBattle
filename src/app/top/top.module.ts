import { NgModule } from "@angular/core";
import { TopRoutingModule } from './top.routing.module';
import { TopComponent } from './top.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/reducers/top.reducer';
import { ScrollingModule } from '@angular/cdk/scrolling'; 
import { SharedModule} from '../shared/shared.module'


@NgModule({
    imports:[
        TopRoutingModule,
        StoreModule.forFeature('top', reducer),
        ScrollingModule,
        SharedModule
    ],
    declarations:[TopComponent]
})
export class TopModule { }