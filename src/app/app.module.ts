import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';

import { ProfileService } from './services/profile.service';
import { HttpClientModule} from '@angular/common/http';

/* components */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeService } from './services/home.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      name: 'Git Battle',
      maxAge:25,
      logOnly: environment.production
    })
  ],
  providers: [ProfileService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
