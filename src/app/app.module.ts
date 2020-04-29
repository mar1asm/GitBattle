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
import { ProfileComponent } from './components/profile/profile.component';
import { environment } from 'src/environments/environment';
import { AboutComponent } from './components/about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Git Battle',
      maxAge:25,
      logOnly: environment.production
    })
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
