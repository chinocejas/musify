import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserEditComponent} from './components/user-ediit.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistAddComponent  } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';

const appRoutes:Routes = [
    {path: '', component: HomeComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: 'artists/:page', component: ArtistListComponent},
    {path: 'crear-artista', component: ArtistAddComponent},
    {path: 'editar-artista/:id', component: ArtistEditComponent},
    {path: 'artista/:id', component: ArtistDetailComponent},
    {path: 'home', component: HomeComponent},
    {path: '**', component: HomeComponent}

]

export const appRoutingProviders:any[]=[];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);