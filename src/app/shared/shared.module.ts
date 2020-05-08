import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [],
  declarations: [
    LoadingComponent
  ],
  exports: [
    LoadingComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
