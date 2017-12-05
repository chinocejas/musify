import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import { ArtistService } from '../../services/artist.services';
import {GLOBAL} from '../../services/global';
import { User } from '../../models/user';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers: [UserService, ArtistService]
})
export class ArtistAddComponent implements OnInit {
    public titulo:string;
    public identity;
    public token;
    public url:string;
    public artists: Artist[];
    public artist: Artist;
    public errorMessage;
    public isEdit;
  constructor(
    private _userServices: UserService,
    private _artistServices: ArtistService,
    private _router:Router,
    private _route: ActivatedRoute
  ) { 
    this.titulo = 'Crear nuevo artista';
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist("","","");  
  }

  ngOnInit() {
    
  }

  onSubmit(){
    this._artistServices.addArtist(this.token,this.artist).subscribe(
      response=>{
        
        if(!response.artist){
          this.errorMessage= 'Error en el servidor';
        } else{
          this.artist = response.artist;
          this.errorMessage= 'El artista se ha creado correctamente';
          this._router.navigate(['./editar-artista',response.artist._id]);
        }
      },
      error =>{
            var errorMessage =<any>error;
            if(errorMessage != null){
              var body= JSON.parse(error._body);
              this.errorMessage = body.message;
              console.log(errorMessage);
        }
      }
    );
  }

}
