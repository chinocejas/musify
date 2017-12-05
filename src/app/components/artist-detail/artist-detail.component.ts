import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import { ArtistService } from '../../services/artist.services';
import { UploadService } from '../../services/upload.service';
import {GLOBAL} from '../../services/global';
import { User } from '../../models/user';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css'],
  providers: [UserService, ArtistService, UploadService]
})
export class ArtistDetailComponent implements OnInit {
  public titulo:string;
  public identity;
  public token;
  public url:string;
  public artists: Artist[];
  public artist: Artist;
  public errorMessage;
  public isEdit=true;
  public artistId;
  
  constructor(
    private _userServices: UserService,
    private _artistServices: ArtistService,
    private _uploadServices: UploadService,
    private _router:Router,
    private _route: ActivatedRoute
  ) { 
    this.titulo = 'Detalle de Artista';
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getArtist();
  }

  getArtist(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
      this.artistId = id;
      this._artistServices.getArtist(this.token, id).subscribe(
        response =>{
          if(!response.artist){
            this._router.navigate(['/']);
          }
          else{
            this.artist = response.artist;

            //sacar los albums del artista
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
    });    
    }
  

}
