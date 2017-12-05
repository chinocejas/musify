import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import { User } from '../../models/user';
import { Artist } from '../../models/artist';
import { ArtistService } from '../../services/artist.services';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers: [UserService, ArtistService]
})
export class ArtistListComponent implements OnInit {
  public titulo:string;
  public identity;
  public token;
  public url:string;
  public artists: Artist[];
  public next_page;
  public prev_page;
  public errorMessage;
  
  constructor(
    private _userServices: UserService,
    private _router:Router,
    private _route: ActivatedRoute,
    private _artistService:ArtistService
  ) { 
    this.titulo = 'Artistas';
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
    this.url = GLOBAL.url;
    this.next_page=1;
    this.prev_page=1;
  }

  ngOnInit() {
    //console.log ('atists-list component cargado');
    this.getArtists();
    console.log(this.artists);
  }

  getArtists(){
    this._route.params.forEach((params:Params)=> {
      let page = +params['page'];
      if(!page){
        page =1;
      }else{
        this.next_page = page +1;
        this.prev_page = page -1;
        if(this.prev_page == 0){
          this.prev_page =1;
        }
      }
      this._artistService.getArtists(this.token, page).subscribe(
          response =>{
            if(!response.artists){
              this._router.navigate(['/']);
            }else{
              this.artists = response.artists;
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

  deleteArtist(artistId){
    this._artistService.deleteArtist(this.token,artistId).subscribe(
      response =>{
        if(!response.artist){
          this._router.navigate(['/']);
        }else{
          this.errorMessage='El artista ha sido eliminado correctamente';
          console.log(this.errorMessage);
          this._router.navigate(['/artists',1]);
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
