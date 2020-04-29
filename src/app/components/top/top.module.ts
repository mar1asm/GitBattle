import { NgModule } from "@angular/core";
import { TopRoutingModule } from './top.routing.module';
import { TopComponent } from './top.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/top.reducer';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling'; 


@NgModule({
    imports:[
        TopRoutingModule,
        CommonModule,  //TODO: MOVE THESE INTO A SHARED MODULE
        StoreModule.forFeature('top', reducer),
        ScrollingModule
    ],
    declarations:[TopComponent]
})
export class TopModule { }