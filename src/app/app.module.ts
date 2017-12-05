import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from'@angular/forms';
import {HttpModule} from'@angular/http';

import { AppComponent } from './app.component';
import { ListadoComponent } from './listado/listado.component';
import { ContactoComponent } from './components/contacto/contacto.component';

import {UserEditComponent} from './components/user-ediit.component'; 

import { routing,appRoutingProviders } from './app.routing';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    ContactoComponent,
    UserEditComponent,
    ArtistListComponent,
    HomeComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
